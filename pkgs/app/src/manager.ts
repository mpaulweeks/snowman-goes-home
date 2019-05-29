import { Generator, Move } from "ice-puzzle-utils";
import { PlayableLevel } from "./level";

const moveMap: { [code: string]: Move } = {
  'ArrowLeft': Move.Left,
  'ArrowRight': Move.Right,
  'ArrowUp': Move.Up,
  'ArrowDown': Move.Down,
};

export class GameManager {
  canvasElm: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  currentLevel: (PlayableLevel | undefined);

  constructor(canvasElm: HTMLCanvasElement) {
    this.canvasElm = canvasElm;
    canvasElm.width = 800;
    canvasElm.height = 600;
    this.ctx = canvasElm.getContext('2d') as CanvasRenderingContext2D;

    window.addEventListener('keydown', e => {
      // console.log(e);
      const move = moveMap[e.code] || undefined;
      if (move) {
        this.handleMove(move);
      }
      if (e.code === 'KeyR') {
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

  draw() {
    const { canvasElm, ctx, currentLevel } = this;
    const { width, height } = canvasElm;

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

    ctx.fillStyle = 'yellow';
    ctx.fillRect(currentLevel.level.start.x * blockWidth, currentLevel.level.start.y * blockHeight, blockWidth, blockHeight);

    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(currentLevel.level.win.x * blockWidth, currentLevel.level.win.y * blockHeight, blockWidth, blockHeight);

    ctx.fillStyle = 'grey';
    currentLevel.level.blocks.forEach(block => {
      ctx.fillRect(block.x * blockWidth, block.y * blockHeight, blockWidth, blockHeight);
    });

    ctx.fillStyle = 'white';
    ctx.fillRect(
      currentLevel.hero.point.x * blockWidth + blockWidth * 0.2,
      currentLevel.hero.point.y * blockHeight + blockHeight * 0.2,
      blockWidth * 0.6,
      blockHeight * 0.6
    );
  }
}
