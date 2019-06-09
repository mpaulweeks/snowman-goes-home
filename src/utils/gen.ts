import { Level, SolvableLevel } from "./level";
import { Point } from "./point";

function range(n: number): Array<number> {
  let arr: Array<number> = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

function randomInRange(min: number, max: number) {
  return min + (Math.random() * (max - min));
}

export class BlockAllocator {
  spaces: Array<Point> = [];

  constructor(width: number, height: number) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.spaces.push(new Point(x, y));
      }
    }
  }

  pop(): Point {
    const index = Math.floor(Math.random() * this.spaces.length);
    return this.spaces.splice(index, 1)[0];
  }
}

export interface GeneratorSettings {
  width: number;
  height: number;
  blockPercentMin: number;
  blockPercentMax: number;
  minMovesMin: number;
  minMovesMax: number;
}

export class Generator {
  settings: GeneratorSettings;

  constructor(settings: GeneratorSettings) {
    this.settings = settings;
  }

  tryGenerateLevel(numBlocks: number, minMoves: number): (SolvableLevel | null) {
    const { width, height } = this.settings;
    const allocator = new BlockAllocator(width, height);
    const win = allocator.pop();
    const start = allocator.pop();
    const blocks = range(numBlocks).map(_ => allocator.pop());
    const level = new Level(width, height, start, win, blocks);
    const solution = level.solve();
    return solution && solution.moves.length > minMoves ? new SolvableLevel(level, solution) : null;
  }

  generateLevels(max: number, tries: number): Array<SolvableLevel> {
    const {
      width,
      height,
      blockPercentMin,
      blockPercentMax,
      minMovesMin,
      minMovesMax,
    } = this.settings;
    const levels: Array<SolvableLevel> = [];
    let attempts = 0;
    while (levels.length < max && attempts < tries * 10) {
      const numBlocks = width * height * randomInRange(blockPercentMin, blockPercentMax);
      const minMoves = randomInRange(minMovesMin, minMovesMax);
      for (let i = 0; levels.length < max && i < tries; i++) {
        attempts += 1;
        const level = this.tryGenerateLevel(numBlocks, minMoves);
        if (level) {
          levels.push(level);
        }
      }
    }
    console.log(attempts);
    return levels;
  }
}
