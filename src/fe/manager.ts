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

const facingMap: { [move: string]: Sprite } = {
  [Move.Down]: Sprites.heroRight,
  [Move.Left]: Sprites.heroLeft,
  [Move.Right]: Sprites.heroRight,
  [Move.Up]: Sprites.heroLeft,
};

interface Animation {
  stopwatch: Stopwatch;
}
interface TravelAnimation extends Animation {
  facing: Sprite;
  traveled: Traveled;
}
interface TouchAnimation extends Animation {
  move: Move;
}
interface ClearAnimation extends Animation {
  origin: Point;
}
interface TouchTriangleByMove {
  [move: string]: Point[];
}

const CanvasNotReadyError = new Error('canvas is not loaded yet');

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
  private spriteFacing = Sprites.heroRight;
  private travelAnimations: TravelAnimation[] = [];
  private touchAnimations: TouchAnimation[] = [];
  private clearAnimations: ClearAnimation[] = [];
  private touchPolygonByMove: TouchTriangleByMove = {};
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

    // setup touchPolygonByMove
    const TopLeft = new Point(0, 0);
    const TopLeftCenter = new Point(canvasElm.width / 4, canvasElm.height / 4);
    const TopRight = new Point(canvasElm.width, 0);
    const TopRightCenter = new Point(canvasElm.width * 3 / 4, canvasElm.height / 4);
    const BottomLeft = new Point(0, canvasElm.height);
    const BottomLeftCenter = new Point(canvasElm.width / 4, canvasElm.height * 3 / 4);
    const BottomRight = new Point(canvasElm.width, canvasElm.height);
    const BottomRightCenter = new Point(canvasElm.width * 3 / 4, canvasElm.height * 3 / 4);
    this.touchPolygonByMove = {
      [Move.Left]: [TopLeft, TopLeftCenter, BottomLeftCenter, BottomLeft],
      [Move.Right]: [TopRight, TopRightCenter, BottomRightCenter, BottomRight],
      [Move.Up]: [TopLeft, TopLeftCenter, TopRightCenter, TopRight],
      [Move.Down]: [BottomLeft, BottomLeftCenter, BottomRightCenter, BottomRight],
    };
  }

  public clickReset = () => {
    if (this.currentLevel) {
      this.currentLevel.reset();
    }
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
    // sprite show face left/right or keep its current direction
    this.spriteFacing = [Move.Left, Move.Right].includes(move) ? facingMap[move] : this.spriteFacing;
    this.animateMove(move, moveInfo, this.spriteFacing);
    if (currentLevel.level.isWinningPoint(moveInfo.point)) {
      this.nextLevel();
    }
  }
  private async nextLevel() {
    const { currentLevelIndex, world } = this;
    if (!world) {
      throw new Error('this should be impossible');
    }
    const nextSolvableLevel = await world.loadLevel(currentLevelIndex);
    this.currentLevel = nextSolvableLevel && new PlayableLevel(nextSolvableLevel);
    if (this.currentLevel) {
      console.log(this.currentLevel.soln.printMoves());
      this.dispatch(setLevel(this.currentLevelIndex));
      this.currentLevelIndex += 1;
      this.stopwatch.addTime(1000 * (world.progression.secondsPerLevel || 0));
      this.travelAnimations = [];
      this.clearAnimations.push({
        origin: this.currentLevel.level.start,
        stopwatch: new Stopwatch(500),
      }, {
          origin: this.currentLevel.level.win,
          stopwatch: new Stopwatch(500),
        });
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
  private animateMove(move: Move, moveInfo: MoveInformation, facing: Sprite) {
    const animations = moveInfo.traveled.slice(0, -1).map((t, i, arr) => ({
      facing,
      stopwatch: new Stopwatch(1000 * (1 + (i / arr.length))),
      traveled: t,
    }));
    this.travelAnimations.push(...animations);
    this.touchAnimations.push({
      move,
      stopwatch: new Stopwatch(200),
    });
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
      blockHeight * scale,
    );
  }
  private drawSpriteWithOpacity(alpha: number, sprite: Sprite, x: number, y: number, scale?: number) {
    const { ctx } = this;
    if (!ctx) {
      throw CanvasNotReadyError;
    }
    const oldAlpha = ctx.globalAlpha;
    ctx.globalAlpha = alpha;
    this.drawSprite(sprite, x, y, scale);
    ctx.globalAlpha = oldAlpha;
  }
  private async draw() {
    const { canvasElm, ctx, currentLevel, world, touchPolygonByMove } = this;
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

    // blocks
    currentLevel.level.blocks.forEach(block => {
      const sprite = (block.x + block.y) % 2 === 0 ? Sprites.treeLight : Sprites.treeHeavy;
      this.drawSprite(sprite, block.x, block.y);
    });

    // ghosts
    this.travelAnimations = this.travelAnimations.filter((a) => a.stopwatch.getRemaining() > 0);
    this.travelAnimations.forEach((a) => {
      const { facing, traveled, stopwatch } = a;
      const opacity = stopwatch.getPercent() * 0.7;
      this.drawSpriteWithOpacity(
        opacity,
        facing,
        traveled.point.x,
        traveled.point.y,
        1.2,
      );
    });

    // touch indicator
    this.touchAnimations = this.touchAnimations.filter((a) => a.stopwatch.getRemaining() > 0);
    if (store.getState().shouldDrawTouch) {
      this.touchAnimations.forEach((a) => {
        const { move, stopwatch } = a;
        const points = touchPolygonByMove[move];
        const opacity = stopwatch.getPercent() * 0.5;
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.reverse().forEach((p) => {
          ctx.lineTo(p.x, p.y);
        });
        ctx.fill();
      });
    }

    // clear whiteout
    this.clearAnimations = this.clearAnimations.filter((a) => a.stopwatch.getRemaining() > 0);
    this.clearAnimations.forEach((a) => {
      const { origin, stopwatch } = a;
      const maxRadius = Math.max(width, height);
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(
        (origin.x + 0.5) * blockWidth,
        (origin.y + 0.5) * blockHeight,
        maxRadius * stopwatch.getPercent(),
        0, 2 * Math.PI, false,
      );
      ctx.fill();
    });

    // goal square
    this.drawSprite(Sprites.igloo, currentLevel.level.win.x, currentLevel.level.win.y);

    // hero
    this.drawSprite(
      this.spriteFacing,
      currentLevel.hero.point.x, currentLevel.hero.point.y, 1.2);
  }
}
