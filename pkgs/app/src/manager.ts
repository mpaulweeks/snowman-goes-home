import { Generator, Move, PlayableLevel } from "ice-puzzle-utils";

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

export class GameManager {
  canvasElm: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  currentLevel: (PlayableLevel | undefined);
  sprites: Sprites;
  ready: Promise<boolean>;

  constructor(canvasElm: HTMLCanvasElement) {
    this.canvasElm = canvasElm;
    canvasElm.width = 800;
    canvasElm.height = 600;
    this.ctx = canvasElm.getContext('2d') as CanvasRenderingContext2D;

    this.sprites = {
      hero: loadImage('img/ice_blue.png'),
    };
    const allSprites = Object.values(this.sprites);
    this.ready = Promise.all(allSprites.map(s => s.loaded)).then(() => true);

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
        this.newLevel();
      }
    });
  }

  handleMove(move: Move) {
    const { currentLevel } = this;
    if (!currentLevel) {
      return;
    }
    currentLevel.moveHero(move);
    this.draw();
  }
  newLevel() {
    const generator = new Generator(10, 8, Math.random() * 0.1 + 0.2, Math.random() * 10 + 5);
    const newLevel = generator.generateLevels(1, 1000)[0];
    if (newLevel) {
      console.log('solution:', newLevel.soln.printMoves());
    }
    this.currentLevel = newLevel && new PlayableLevel(newLevel);
    this.draw();
  }

  async draw() {
    const { canvasElm, ctx, currentLevel, ready, sprites } = this;
    const { width, height } = canvasElm;

    await ready;

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
    for (let y = 0; y < currentLevel.level.height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * blockHeight);
      ctx.lineTo(width, y * blockHeight);
      ctx.stroke();
    }
    for (let x = 0; x < currentLevel.level.width; x++) {
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

    ctx.drawImage(
      sprites.hero.image,
      currentLevel.hero.point.x * blockWidth + blockWidth * 0.2,
      currentLevel.hero.point.y * blockHeight + blockHeight * 0.2,
      blockWidth * 0.6,
      blockHeight * 0.6
    );
  }
}
