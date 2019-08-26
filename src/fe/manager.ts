import { setGameOver, setLevel, setTimer, setWorld, store } from '../redux';
import { Move, MoveInformation, PlayableLevel, Point, Stopwatch, Traveled, World, WorldLoader } from '../utils';
import { Sprite, Sprites } from './sprite';
import { GlobalStyle, StyleByDifficulty } from './style';

const moveMap: { [code: string]: Move } = {
  ArrowDown: Move.Down,
  ArrowLeft: Move.Left,
  ArrowRight: Move.Right,
  ArrowUp: Move.Up,
};

export interface Animation {
  traveled: Traveled;
  stopwatch: Stopwatch;
}

export class GameManager {
  public worldLoader: WorldLoader;
  private dispatch = store.dispatch;
  private isDebug = window.location.href.includes('localhost');
  private worldDimensions: Point;
  private canvasDimensions: Point;
  private canvasElm?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  private world?: World;
  private stopwatch = new Stopwatch();
  private currentLevel: (PlayableLevel | undefined);
  private currentLevelIndex = 0;
  private spriteFacing = Move.Right;
  private pendingAnimations: Animation[] = [];
  private frameTick = 0;

  constructor() {
    const { isDebug } = this;
    if (isDebug) {
      const w: any = window;
      w.DEBUG = this;
    }

    // determine largest possible canvas size
    const screenHeight = document.body.clientHeight * 0.8; // matching css of 80vh
    const screenWidth = document.body.clientWidth;

    // determine canvas orientation
    const isVertical = screenHeight > screenWidth;
    const dimensions = isVertical ? new Point(8, 10) : new Point(10, 8);
    this.worldDimensions = dimensions;
    this.worldLoader = new WorldLoader(this.worldDimensions);

    // shrink down canvas size until it fits on this screen
    let canvasHeight = screenHeight;
    let canvasWidth = canvasHeight * dimensions.x / dimensions.y;
    while (canvasWidth > screenWidth) {
      canvasHeight -= 1;
      canvasWidth = canvasHeight * dimensions.x / dimensions.y;
    }
    this.canvasDimensions = new Point(canvasWidth, canvasHeight);

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
      if (e.code === 'KeyN' && isDebug) {
        this.nextLevel();
      }
    });

    // setup passive draw/load loop
    this.loop();
  }
  public setup(canvasElm: HTMLCanvasElement) {
    this.canvasElm = canvasElm;
    canvasElm.width = this.canvasDimensions.x;
    canvasElm.height = this.canvasDimensions.y;
    this.ctx = canvasElm.getContext('2d') as CanvasRenderingContext2D;
  }

  public clickReset = () => {
    this.currentLevel && this.currentLevel.reset();
  }
  public onTouchStart = (evt: React.TouchEvent<HTMLElement>) => {
    const touchEvt = evt.nativeEvent.touches[0];
    const rect = (evt.target as HTMLElement).getBoundingClientRect();
    const x = touchEvt.clientX - rect.left;
    const y = touchEvt.clientY - rect.top;
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
  public clickUp = () => {
    this.handleMove(Move.Up);
  }
  public clickDown = () => {
    this.handleMove(Move.Down);
  }
  public clickLeft = () => {
    this.handleMove(Move.Left);
  }
  public clickRight = () => {
    this.handleMove(Move.Right);
  }

  public setWorld(world: World) {
    this.worldLoader = new WorldLoader(this.worldDimensions);
    this.world = world;
    this.currentLevelIndex = 0;
    this.stopwatch = world.createStopwatch();
    this.nextLevel();
    this.dispatch(setWorld(world));
  }
  public unsetWorld() {
    // todo score should dispatch this action
    this.world = undefined;
    this.dispatch(setWorld(undefined));
  }
  private triggerGameOver() {
    this.world = undefined;
    this.dispatch(setGameOver());
  }

  private handleMove(move: Move) {
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
  private async nextLevel() {
    const { currentLevelIndex, world } = this;
    if (!world) {
      throw new Error('this should be impossible');
    }
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

  private async loop() {
    const { world, stopwatch } = this;
    if (world) {
      await this.draw();
      if (world.isInfinite()) {
        world.generateLevels();
        if (stopwatch.formatRemaining() !== store.getState().secondsRemaining) {
          this.dispatch(setTimer(stopwatch));
        }
        if (stopwatch.getRemaining() < 0) {
          this.triggerGameOver();
        }
      } else {
        if (stopwatch.formatElapsed() !== store.getState().secondsElapsed) {
          this.dispatch(setTimer(stopwatch));
        }
      }
    } else if (!store.getState().isGameOver) {
      this.worldLoader.loadInBackground();
    }
    window.requestAnimationFrame(() => this.loop());
  }
  private animateMove(moveInfo: MoveInformation) {
    const animations = moveInfo.traveled.slice(0, -1).map((t, i, arr) => ({
      traveled: t,
      stopwatch: new Stopwatch(1000 * (1 + (i / arr.length))),
    }));
    this.pendingAnimations.push(...animations);
  }
  private drawSprite(sprite: Sprite, x: number, y: number, scale?: number) {
    const { canvasElm, ctx, currentLevel } = this;
    if (!canvasElm || !ctx || !currentLevel) {
      return;
    }
    const { width, height } = canvasElm;
    const blockWidth = width / currentLevel.level.width;
    const blockHeight = height / currentLevel.level.height;
    scale = scale || 1;
    ctx.drawImage(
      sprite.atFrame(this.frameTick).image,
      x * blockWidth + (blockWidth * (1 - scale) / 2),
      y * blockHeight + (blockHeight * (1 - scale) / 2),
      blockWidth * scale,
      blockHeight * scale
    );
  }
  private drawSpriteWithOpacity(alpha: number, sprite: Sprite, x: number, y: number, scale?: number) {
    const { ctx } = this;
    if (!ctx) {
      return;
    }
    const oldAlpha = ctx.globalAlpha;
    ctx.globalAlpha = alpha;
    this.drawSprite(sprite, x, y, scale);
    ctx.globalAlpha = oldAlpha;
  }
  private async draw() {
    const { canvasElm, ctx, currentLevel, world } = this;
    if (!canvasElm || !ctx) {
      return;
    }
    const { width, height } = canvasElm;

    await Sprites.loaded;

    if (!currentLevel || !world) {
      return;
    }

    this.frameTick = Math.floor(world.progression.boilFps * new Date().getTime() / 1000);
    const blockWidth = width / currentLevel.level.width;
    const blockHeight = height / currentLevel.level.height;
    const worldStyle = StyleByDifficulty[world.difficulty];

    // background
    ctx.fillStyle = GlobalStyle.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    for (let y = 0; y < currentLevel.level.height; y++) {
      for (let x = 0; x < currentLevel.level.width; x++) {
        this.drawSprite(worldStyle.ground, x, y);
      }
    }

    // grid
    if (store.getState().shouldDrawGrid) {
      ctx.strokeStyle = worldStyle.gridColor;
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
      const opacity = stopwatch.getPercent() * 0.7;
      this.drawSpriteWithOpacity(
        opacity,
        // todo this is buggy on up/dowh
        traveled.move === Move.Left ? Sprites.heroLeft : Sprites.heroRight,
        traveled.point.x,
        traveled.point.y,
        1.2,
      );
    });

    // goal square
    this.drawSprite(Sprites.igloo, currentLevel.level.win.x, currentLevel.level.win.y);

    // blocks
    currentLevel.level.blocks.forEach(block => {
      const sprite = (block.x + block.y) % 2 === 0 ? Sprites.treeLight : Sprites.treeHeavy;
      this.drawSprite(sprite, block.x, block.y);
    });

    // hero
    this.drawSprite(
      this.spriteFacing === Move.Left ? Sprites.heroLeft : Sprites.heroRight,
      currentLevel.hero.point.x, currentLevel.hero.point.y, 1.2);
  }
}
