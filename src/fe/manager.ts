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
  canvasElm: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  currentLevel: (PlayableLevel | undefined);
  currentLevelIndex = 0;
  sprites: Sprites;
  loadedAssets: Promise<boolean>;
  pendingAnimations: Array<Animation> = [];
  world: (World | undefined);
  worldLoader: WorldLoader;

  constructor(canvasElm: HTMLCanvasElement) {
    this.canvasElm = canvasElm;
    canvasElm.width = 800;
    canvasElm.height = 600;
    this.ctx = canvasElm.getContext('2d') as CanvasRenderingContext2D;

    this.sprites = {
      hero: loadImage('img/ice_blue.png'),
    };
    const allSprites = Object.values(this.sprites);
    this.loadedAssets = Promise.all(allSprites.map(s => s.loaded)).then(() => true);

    window.addEventListener('keydown', e => {
      // console.log(e);
      const move = moveMap[e.code] || undefined;
      if (move) {
        this.handleMove(move);
      }
      if (e.code === 'KeyR') {
        this.currentLevel && this.currentLevel.reset();
        this.draw();
      }
      if (e.code === 'KeyN') {
        this.nextLevel();
      }
    });

    this.worldLoader = new WorldLoader();
    this.worldLoader.loaders[1].onLoad.then(w => {
      this.world = w;
      this.nextLevel();
    });

    // setup passive draw loop
    this.loop();
  }

  async loop() {
    this.worldLoader.loadInBackground();
    await this.draw();
    window.requestAnimationFrame(() => this.loop());
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
    const levels = await world.loadNow(); // todo rewrite to not use async?
    const nextLevel = levels[currentLevelIndex % levels.length];
    this.currentLevel = new PlayableLevel(nextLevel);
    console.log(this.currentLevel.soln.printMoves());
    this.currentLevelIndex += 1;
    this.pendingAnimations = [];
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
    const { width, height } = canvasElm;

    await loadedAssets;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    if (!currentLevel) {
      ctx.font = '20px monospace';
      ctx.fillStyle = 'white';
      ctx.fillText('making level failed, try again', 100, 100);
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

    ctx.fillStyle = 'grey';
    ctx.fillRect(currentLevel.level.start.x * blockWidth, currentLevel.level.start.y * blockHeight, blockWidth, blockHeight);

    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(currentLevel.level.win.x * blockWidth, currentLevel.level.win.y * blockHeight, blockWidth, blockHeight);

    ctx.fillStyle = 'lightgrey';
    currentLevel.level.blocks.forEach(block => {
      ctx.fillRect(block.x * blockWidth, block.y * blockHeight, blockWidth, blockHeight);
    });

    this.pendingAnimations = this.pendingAnimations.filter(a => a.stopwatch.getTime() > 0);
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
