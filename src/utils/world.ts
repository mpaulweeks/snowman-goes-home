import { Generator, range, rangeFrom } from "./gen";
import { SolvableLevel } from "./level";
import { Point } from "./point";
import { Stopwatch } from "./stopwatch";

export enum Difficulty {
  Easy = 1,
  Medium,
  Hard,
  Infinite,
  // Test,
};

// race against time to get far, then get score based on how quick
export interface Progression {
  gridSize: (number),
  minMoves: number;
  levelsPerTier: number;
  totalLevels: number;
  secondsPerLevel?: number;
}

const ProgressionByDifficulty = {
  [Difficulty.Easy]: {
    gridSize: 1,
    minMoves: 7,
    levelsPerTier: 2,
    totalLevels: 10,
  },
  [Difficulty.Medium]: {
    gridSize: 1.5,
    minMoves: 7,
    levelsPerTier: 1,
    totalLevels: 15,
  },
  [Difficulty.Hard]: {
    gridSize: 2,
    minMoves: 10,
    levelsPerTier: 2,
    totalLevels: 20,
  },
  [Difficulty.Infinite]: {
    gridSize: 1.5,
    minMoves: 7,
    levelsPerTier: 3,
    totalLevels: 20,
    secondsPerLevel: 5,
  },
}

export interface LevelsByMoves {
  [minMoves: number]: Array<SolvableLevel>;
}

export interface World {
  difficulty: Difficulty;
  totalLevels: number;
  progression: Progression;
  loaded: boolean;
  onLoad: Promise<World>;
  displayName: () => string;
  isInfinite: () => boolean;
  createStopwatch: () => Stopwatch;
  generateLevels: () => void;
  loadLevel: (i: number) => Promise<SolvableLevel | undefined>;
}

class BasicWorld implements World {
  dimensions: Point;
  difficulty: Difficulty;
  totalLevels: number;
  progression: Progression;
  loaded = false;
  onLoad: Promise<World>;
  registerLoaded = () => { };

  constructor(dimensions: Point, difficulty: Difficulty) {
    this.dimensions = dimensions;
    this.difficulty = difficulty;
    this.progression = ProgressionByDifficulty[difficulty];
    this.onLoad = new Promise((resolve, reject) => {
      this.registerLoaded = () => resolve(this);
    });
    this.totalLevels = this.progression.totalLevels;
  }
  displayName() {
    return Difficulty[this.difficulty];
  }
  isInfinite() {
    return this.difficulty === Difficulty.Infinite;
  }
  createStopwatch() {
    const secondsPerLevel = this.progression.secondsPerLevel || 0;
    const startTime = 1000 * (60 - secondsPerLevel);
    // const startTime = 5; // for testing infinite mode
    return new Stopwatch(this.isInfinite() ? startTime : undefined);
  }

  generateLevels() {
    throw new Error('base class');
  }
  loadLevel(index: number): Promise<SolvableLevel | undefined> {
    throw new Error('base class');
  }
}

class FiniteWorld extends BasicWorld {
  levelsByMoves: LevelsByMoves;

  constructor(dimensions: Point, difficulty: Difficulty) {
    super(dimensions, difficulty);
    this.levelsByMoves = range(this.progression.totalLevels / this.progression.levelsPerTier)
      .reduce((obj: LevelsByMoves, num) => {
        obj[num + this.progression.minMoves] = [];
        return obj;
      }, {});
  }

  getLevelKeys() {
    // for some reason, array.sort() on numbers will sort like strings
    function compareNums(a: number, b: number) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }
    return Object.keys(this.levelsByMoves).map(parseFloat).sort(compareNums);
  }

  generateLevels() {
    const { dimensions, levelsByMoves, progression } = this;
    const { gridSize, levelsPerTier } = progression;
    const remainingMinMoves = this.getLevelKeys().filter(k => levelsByMoves[k].length < levelsPerTier);
    if (remainingMinMoves.length === 0) {
      this.loaded = true;
      this.registerLoaded();
      return;
    }
    const scaledDimensions = new Point(dimensions.x * gridSize, dimensions.y * gridSize);
    const gen = new Generator({
      width: scaledDimensions.x,
      height: scaledDimensions.y,
      blockPercentMin: 0.05,
      blockPercentMax: 0.3,
      minMovesOptions: remainingMinMoves,
    })
    const levels = gen.generateLevels(500, 500);
    levels.forEach(l => {
      const tier = levelsByMoves[l.soln.moves.length];
      if (tier && tier.length < levelsPerTier) {
        tier.push(l);
      }
    });
  }

  async loadLevel(index: number) {
    while (!this.loaded) {
      this.generateLevels();
    }
    const levels = this.getLevelKeys().reduce((arr: Array<SolvableLevel>, key) => {
      arr.push(...this.levelsByMoves[key]);
      return arr;
    }, []);
    return levels[index];
  }
}

class InfiniteWorld extends BasicWorld {
  levels: Array<SolvableLevel> = [];
  lastIndex = 0;

  constructor(dimensions: Point) {
    super(dimensions, Difficulty.Infinite);
  }

  generateLevels() {
    const { dimensions, levels, progression, lastIndex } = this;
    const { gridSize } = progression;
    if (levels.length > lastIndex + 10) {
      this.loaded = true;
      this.registerLoaded();
      return;
    }
    // todo randomize gridSize, minMoves
    const scaledDimensions = new Point(dimensions.x * gridSize, dimensions.y * gridSize);
    const gen = new Generator({
      width: scaledDimensions.x,
      height: scaledDimensions.y,
      blockPercentMin: 0.05,
      blockPercentMax: 0.3,
      minMovesOptions: rangeFrom(progression.minMoves, 10),
    })
    this.levels.push(...gen.generateLevels(10, 10));
    if (levels.length > lastIndex + 10) {
      console.log('infinite loaded!');
    }
  }

  async loadLevel(index: number) {
    while (index > this.levels.length) {
      this.generateLevels();
    }
    this.lastIndex = index;
    return this.levels[index];
  }
}

export class WorldLoader {
  loaders: Array<World>;

  constructor(dimensions: Point) {
    this.loaders = [
      new InfiniteWorld(dimensions),
      ...[
        Difficulty.Easy,
        Difficulty.Medium,
        Difficulty.Hard,
      ].map(d => new FiniteWorld(dimensions, d)),
    ];
  }

  getLoaderByDifficulty(difficulty: Difficulty) {
    return this.loaders.filter(w => w.difficulty === difficulty)[0];
  }

  loadInBackground() {
    const toLoad = this.loaders.filter(w => !w.loaded)[0];
    if (toLoad) {
      toLoad.generateLevels();
      if (toLoad.loaded) {
        console.log('loaded:', Difficulty[toLoad.difficulty]);
      }
    }
  }
}
