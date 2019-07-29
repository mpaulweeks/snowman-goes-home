import { Level, SolvableLevel } from "./level";
import { Point } from "./point";

export function range(n: number): Array<number> {
  let arr: Array<number> = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

export function rangeFrom(start: number, length: number): Array<number> {
  return range(length).map(i => i + start);
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
  minMovesOptions: Array<number>;
}

export class Generator {
  settings: GeneratorSettings;

  constructor(settings: GeneratorSettings) {
    this.settings = settings;
  }

  tryGenerateLevel(numBlocks: number): (SolvableLevel | null) {
    const { width, height, minMovesOptions } = this.settings;
    const allocator = new BlockAllocator(width, height);
    const win = allocator.pop();
    const start = allocator.pop();
    const blocks = range(numBlocks).map(_ => allocator.pop());
    const level = new Level(width, height, start, win, blocks);
    const solution = level.solve();
    return solution && minMovesOptions.includes(solution.moves.length) ? new SolvableLevel(level, solution) : null;
  }

  generateLevels(max: number, tries: number): Array<SolvableLevel> {
    const {
      width,
      height,
      blockPercentMin,
      blockPercentMax,
    } = this.settings;
    const levels: Array<SolvableLevel> = [];
    let attempts = 0;
    const triesPerMutation = Math.min(tries / 10, 100);
    while (levels.length < max && attempts < tries) {
      const numBlocks = width * height * randomInRange(blockPercentMin, blockPercentMax);
      for (let i = 0; levels.length < max && i < triesPerMutation; i++) {
        attempts += 1;
        const level = this.tryGenerateLevel(numBlocks);
        if (level) {
          levels.push(level);
        }
      }
    }
    // console.log(attempts);
    return levels;
  }
}
