import { Generator, Level } from "ice-puzzle-utils";

export class GameManager {
  canvasElm: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  generator: Generator;
  currentLevel: Level;

  constructor(canvasElm: HTMLCanvasElement) {
    this.canvasElm = canvasElm;
    this.ctx = canvasElm.getContext('2d');
    this.generator = new Generator(10, 8, 0.1, 8);
  }

  newLevel() {
    this.currentLevel = this.generator.generateLevels(1, 1000)[0];
  }

  draw() {
    const { canvasElm, ctx, currentLevel } = this;
    const { width, height } = canvasElm;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    if (!currentLevel) {
      return;
    }

    const blockWidth = width / currentLevel.width;
    const blockHeight = height / currentLevel.height;

    // grid
    ctx.strokeStyle = 'white';
    for (let y = 0; y < currentLevel.height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * blockHeight);
      ctx.lineTo(height, y * blockHeight);
      ctx.stroke();
    }
    for (let x = 0; x < currentLevel.width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * blockWidth, 0);
      ctx.lineTo(x * blockWidth, width);
      ctx.stroke();
    }

    ctx.fillStyle = 'yellow';
    ctx.fillRect(currentLevel.start.x * blockWidth, currentLevel.start.y * blockHeight, blockWidth, blockHeight);

    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(currentLevel.win.x * blockWidth, currentLevel.win.y * blockHeight, blockWidth, blockHeight);

    ctx.fillStyle = 'grey';
    currentLevel.blocks.forEach(block => {
      ctx.fillRect(block.x * blockWidth, block.y * blockHeight, blockWidth, blockHeight);
    });
  }
}
