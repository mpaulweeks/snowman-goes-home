import { store } from "../redux";
import { setGameOver, setLevel, setTimer, setWorld } from "../redux";
import { Move, MoveInformation, Traveled, PlayableLevel, Point, Stopwatch, World, WorldLoader } from "../utils";
import { Sprite, Sprites } from './sprite';

const Color = {
  background: 'white', // matching css
  grid: 'black',
  glow: 'rgba(0, 0, 0, 0.5)',
};

const moveMap: { [code: string]: Move } = {
  'ArrowLeft': Move.Left,
  'ArrowRight': Move.Right,
  'ArrowUp': Move.Up,
  'ArrowDown': Move.Down,
};

export interface Animation {
  traveled: Traveled,
  stopwatch: Stopwatch,
}

export class GameManager {
  dispatch = store.dispatch;
  worldLoader: WorldLoader;
  worldDimensions: Point;
  canvasDimensions: Point;
  canvasElm?: HTMLCanvasElement;
  ctx?: CanvasRenderingContext2D;
  world?: World;
  stopwatch = new Stopwatch();
  currentLevel: (PlayableLevel | undefined);
  currentLevelIndex = 0;
  spriteFacing: Move.Right;
  loadedAssets: Promise<boolean>;
  pendingAnimations: Array<Animation> = [];
  shouldDrawGrid = false;

  constructor() {
    // determine canvas size
    const screenHeight = document.body.clientHeight;
    const screenWidth = document.body.clientWidth;
    const isMobile = screenHeight > screenWidth;
    const dimensions = isMobile ? new Point(8, 10) : new Point(10, 8);
    const height = document.body.clientHeight * 0.8; // matching css of 80vh
    let width = height * dimensions.x / dimensions.y;
    while (width > screenWidth) {
      dimensions.x -= 1;
      width = height * dimensions.x / dimensions.y;
    }
    this.worldDimensions = dimensions;
    this.worldLoader = new WorldLoader(this.worldDimensions);
    this.canvasDimensions = new Point(width, height);

    // setup key listeners
    window.addEventListener('keydown', e => {
      // console.log(e);
      const move = moveMap[e.code] || undefined;
      if (move) {
        this.handleMove(move);
      }
      if (e.code === 'KeyR') {
        this.clickReset();
      }
      if (e.code === 'KeyN') {
        this.nextLevel();
      }
    });

    // setup passive draw/load loop
    this.loop();
  }
  private async loop() {
    const { world, stopwatch } = this;
    if (world) {
      await this.draw();
      if (world.isInfinite()) {
        world.generateLevels();
        if (stopwatch.getRemaining() !== store.getState().secondsRemaining) {
          this.dispatch(setTimer(stopwatch));
        }
        if (stopwatch.getRemaining() < 0) {
          this.triggerGameOver();
        }
      } else {
        if (stopwatch.getElapsed() !== store.getState().secondsElapsed) {
          this.dispatch(setTimer(stopwatch));
        }
      }
    } else if (!store.getState().isGameOver) {
      this.worldLoader.loadInBackground();
    }
    window.requestAnimationFrame(() => this.loop());
  }

  clickReset = () => {
    this.currentLevel && this.currentLevel.reset();
  }
  clickToggleGrid = () => {
    this.shouldDrawGrid = !this.shouldDrawGrid;
  }
  mouseMove = evt => {
    const rect = evt.target.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const isTopRight = px > py;
    const isTopLeft = px + py < 1;
    const move = (
      (isTopLeft && isTopRight && Move.Up) ||
      (!isTopLeft && isTopRight && Move.Right) ||
      (!isTopLeft && !isTopRight && Move.Down) ||
      (isTopLeft && !isTopRight && Move.Left)
    );
    if (move) {
      this.handleMove(move);
    }
  }
  clickUp = () => {
    this.handleMove(Move.Up);
  }
  clickDown = () => {
    this.handleMove(Move.Down);
  }
  clickLeft = () => {
    this.handleMove(Move.Left);
  }
  clickRight = () => {
    this.handleMove(Move.Right);
  }

  setup(canvasElm: HTMLCanvasElement) {
    this.canvasElm = canvasElm;
    canvasElm.width = this.canvasDimensions.x;
    canvasElm.height = this.canvasDimensions.y;
    this.ctx = canvasElm.getContext('2d') as CanvasRenderingContext2D;
  }
  setWorld(world: World) {
    this.worldLoader = new WorldLoader(this.worldDimensions);
    this.world = world;
    this.currentLevelIndex = 0;
    this.stopwatch = world.createStopwatch();
    this.nextLevel();
    this.dispatch(setWorld(world));
  }
  unsetWorld() {
    // todo score should dispatch this action
    this.world = undefined;
    this.dispatch(setWorld(undefined));
  }
  triggerGameOver() {
    this.world = undefined;
    this.dispatch(setGameOver());
  }

  handleMove(move: Move) {
    const { currentLevel } = this;
    if (!currentLevel) {
      return;
    }
    const moveInfo = currentLevel.moveHero(move);
    // sprite show face left/right or switch its current direction
    this.spriteFacing = [Move.Left, Move.Right].includes(move) ? move : (
      this.spriteFacing === Move.Right ? Move.Left : Move.Right
    )
    this.animateMove(moveInfo);
    if (currentLevel.level.isWinningPoint(moveInfo.point)) {
      this.nextLevel();
    }
  }
  async nextLevel() {
    const { currentLevelIndex, world } = this;
    if (!world) {
      throw new Error('todo this should be impossible');
    }
    // todo maybe keep animations between levels?
    // this.pendingAnimations = [];
    const nextLevel = await world.loadLevel(currentLevelIndex);
    this.currentLevel = nextLevel && new PlayableLevel(nextLevel);
    if (this.currentLevel) {
      console.log(this.currentLevel.soln.printMoves());
      this.dispatch(setLevel(this.currentLevelIndex));
      this.currentLevelIndex += 1;
      this.stopwatch.addTime(1000 * (world.progression.secondsPerLevel || 0));
    } else {
      this.triggerGameOver();
    }
  }

  animateMove(moveInfo: MoveInformation) {
    const animations = moveInfo.traveled.slice(0, -1).map((t, i, arr) => ({
      traveled: t,
      stopwatch: new Stopwatch(1000 * (1 + (i / arr.length))),
    }));
    this.pendingAnimations.push(...animations);
  }
  drawSprite(sprite: Sprite, x: number, y: number, scale?: number) {
    const { canvasElm, ctx, currentLevel } = this;
    const { width, height } = canvasElm;
    const blockWidth = width / currentLevel.level.width;
    const blockHeight = height / currentLevel.level.height;
    scale = scale || 1;
    ctx.drawImage(
      sprite.image,
      x * blockWidth + (blockWidth * (1 - scale) / 2),
      y * blockHeight + (blockHeight * (1 - scale) / 2),
      blockWidth * scale,
      blockHeight * scale
    );
  }
  drawSpriteWithOpacity(alpha: number, sprite: Sprite, x: number, y: number, scale?: number) {
    const { ctx } = this;
    const oldAlpha = ctx.globalAlpha;
    ctx.globalAlpha = alpha;
    this.drawSprite(sprite, x, y, scale);
    ctx.globalAlpha = oldAlpha;
  }
  async draw() {
    const { canvasElm, ctx, currentLevel } = this;
    if (!canvasElm || !ctx) {
      return;
    }
    const { width, height } = canvasElm;

    await Sprites.loaded;

    if (!currentLevel) {
      return;
    }

    const blockWidth = width / currentLevel.level.width;
    const blockHeight = height / currentLevel.level.height;

    // background
    ctx.fillStyle = Color.background;
    ctx.fillRect(0, 0, width, height);
    for (let y = 0; y < currentLevel.level.height; y++){
      for (let x = 0; x < currentLevel.level.width; x++) {
        this.drawSprite(Sprites.groundIce5, x, y);
      }
    }

    // grid
    if (this.shouldDrawGrid) {
      ctx.strokeStyle = Color.grid;
      for (let y = 1; y < currentLevel.level.height; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * blockHeight);
        ctx.lineTo(width, y * blockHeight);
        ctx.stroke();
      }
      for (let x = 1; x < currentLevel.level.width; x++) {
        ctx.beginPath();
        ctx.moveTo(x * blockWidth, 0);
        ctx.lineTo(x * blockWidth, height);
        ctx.stroke();
      }
    }

    // ghosts
    this.pendingAnimations = this.pendingAnimations.filter(a => a.stopwatch.getRemaining() > 0);
    this.pendingAnimations.forEach(a => {
      const { traveled, stopwatch } = a;
      const opacity = stopwatch.getPercent();
      this.drawSpriteWithOpacity(
        opacity,
        traveled.move === Move.Left ? Sprites.heroLeft : Sprites.heroRight, // todo this is buggy on up/dowh
        traveled.point.x,
        traveled.point.y,
        1.2,
      );
    });

    // start square
    // ctx.fillStyle = 'grey';
    // ctx.fillRect(currentLevel.level.start.x * blockWidth, currentLevel.level.start.y * blockHeight, blockWidth, blockHeight);

    // goal square
    this.drawSprite(Sprites.igloo, currentLevel.level.win.x, currentLevel.level.win.y);

    // blocks
    currentLevel.level.blocks.forEach(block => {
      const sprite = (block.x + block.y) % 2 === 0 ? Sprites.treeLight : Sprites.treeHeavy;
      this.drawSprite(sprite, block.x, block.y);
    });

    // hero
    ctx.fillStyle = Color.glow;
    // ctx.fillRect(currentLevel.hero.point.x * blockWidth, currentLevel.hero.point.y * blockHeight, blockWidth, blockHeight);
    ctx.beginPath();
    ctx.arc(
      (currentLevel.hero.point.x + 0.5) * blockWidth,
      (currentLevel.hero.point.y + 0.5) * blockHeight,
      blockWidth / 2,
      0, 2 * Math.PI
     );
    ctx.fill();
    this.drawSprite(
      this.spriteFacing === Move.Left ? Sprites.heroLeft : Sprites.heroRight,
      currentLevel.hero.point.x, currentLevel.hero.point.y, 1.2);
  }
}
