import { store } from "../redux";
import { setLevel, setTimer, setWorld } from "../redux/actions";
import { Move, MoveInformation, PlayableLevel, Point, Stopwatch, World, WorldLoader } from "../utils";

const moveMap: { [code: string]: Move } = {
  'ArrowLeft': Move.Left,
  'ArrowRight': Move.Right,
  'ArrowUp': Move.Up,
  'ArrowDown': Move.Down,
};

interface Sprite {
  image: HTMLImageElement;
  loaded: Promise<boolean>;
}

interface Sprites {
  hero: Sprite;
};

function loadImage(url: string) {
  const img = new Image();
  const state: Sprite = {
    image: img,
    loaded: new Promise((resolve, reject) => {
      img.onload = () => resolve(true);
    }),
  };
  img.src = url;
  return state;
}

export interface Animation {
  point: Point,
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
  sprites: Sprites;
  loadedAssets: Promise<boolean>;
  pendingAnimations: Array<Animation> = [];

  constructor() {
    // determine canvas size
    const screenHeight = document.body.clientHeight;
    const screenWidth = document.body.clientWidth;
    const isMobile = screenHeight > screenWidth;
    const dimensions = isMobile ? new Point(8, 10) : new Point(10, 8);
    const height = document.body.clientHeight * 0.7; // matching css of 70vh
    let width = height * dimensions.x / dimensions.y;
    while (width > screenWidth) {
      dimensions.x -= 1;
      width = height * dimensions.x / dimensions.y;
    }
    this.worldDimensions = dimensions;
    this.worldLoader = new WorldLoader(this.worldDimensions);
    this.canvasDimensions = new Point(width, height);

    // load sprites
    this.sprites = {
      hero: loadImage('img/ice_blue.png'),
    };
    const allSprites = Object.values(this.sprites);
    this.loadedAssets = Promise.all(allSprites.map(s => s.loaded)).then(() => true);

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
      } else {
        if (stopwatch.getElapsed() !== store.getState().secondsElapsed) {
          this.dispatch(setTimer(stopwatch));
        }
      }
      if (stopwatch.getRemaining() < 0) {
        // todo end game
      }
    } else {
      this.worldLoader.loadInBackground();
    }
    window.requestAnimationFrame(() => this.loop());
  }

  clickReset = () => {
    this.currentLevel && this.currentLevel.reset();
    this.draw();
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
    this.world = undefined;
    this.dispatch(setWorld(undefined));
  }

  handleMove(move: Move) {
    const { currentLevel } = this;
    if (!currentLevel) {
      return;
    }
    const moveInfo = currentLevel.moveHero(move);
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
    this.pendingAnimations = [];
    const nextLevel = await world.loadLevel(currentLevelIndex);
    this.currentLevel = nextLevel && new PlayableLevel(nextLevel);
    if (this.currentLevel) {
      console.log(this.currentLevel.soln.printMoves());
      this.dispatch(setLevel(this.currentLevelIndex));
      this.currentLevelIndex += 1;
      this.stopwatch.addTime(1000 * (world.progression.secondsPerLevel || 0));
    } else {
      setTimeout(() => this.unsetWorld(), 2000);
    }
  }

  animateMove(moveInfo: MoveInformation) {
    const animations = moveInfo.traveled.map((p, i, arr) => ({
      point: p,
      stopwatch: new Stopwatch(1000 * (1 + (i / arr.length))),
    }));
    this.pendingAnimations.push(...animations);
  }
  async draw() {
    const { canvasElm, ctx, currentLevel, loadedAssets, sprites } = this;
    if (!canvasElm || !ctx) {
      return;
    }
    const { width, height } = canvasElm;

    await loadedAssets;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    if (!currentLevel) {
      ctx.font = '20px monospace';
      ctx.fillStyle = 'white';
      ctx.fillText('you win! returning to the main menu...', 100, 100);
      return;
    }

    const blockWidth = width / currentLevel.level.width;
    const blockHeight = height / currentLevel.level.height;

    // grid
    ctx.strokeStyle = 'white';
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

    // ctx.fillStyle = 'grey';
    // ctx.fillRect(currentLevel.level.start.x * blockWidth, currentLevel.level.start.y * blockHeight, blockWidth, blockHeight);

    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(currentLevel.level.win.x * blockWidth, currentLevel.level.win.y * blockHeight, blockWidth, blockHeight);

    ctx.fillStyle = 'lightgrey';
    currentLevel.level.blocks.forEach(block => {
      ctx.fillRect(block.x * blockWidth, block.y * blockHeight, blockWidth, blockHeight);
    });

    this.pendingAnimations = this.pendingAnimations.filter(a => a.stopwatch.getRemaining() > 0);
    this.pendingAnimations.forEach(a => {
      const { point, stopwatch } = a;
      const blueLevel = stopwatch.getPercent();
      ctx.fillStyle = `rgba(150, 150, 255, ${blueLevel})`;
      ctx.fillRect(
        point.x * blockWidth + blockWidth * 0.2,
        point.y * blockHeight + blockHeight * 0.2,
        blockWidth * 0.6,
        blockHeight * 0.6
      );
    });

    ctx.drawImage(
      sprites.hero.image,
      currentLevel.hero.point.x * blockWidth + blockWidth * 0.2,
      currentLevel.hero.point.y * blockHeight + blockHeight * 0.2,
      blockWidth * 0.6,
      blockHeight * 0.6
    );
  }
}
