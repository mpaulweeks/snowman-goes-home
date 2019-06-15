import { Generator, range } from "./gen";
import { SolvableLevel } from "./level";
import { Point } from "./point";

export enum Difficulty {
  Easy = 1, // 1s
  Medium, // 2s
  Hard, // 9s
  // Test,
};

// race against time to get far, then get score based on how quick
export interface Progression {
  gridSize: number,
  minMoves: number;
  levelsPerTier: number;
  totalLevels: number;
  secondsPerLevel: number;
}

const ProgressionByDifficulty = {
  // [Difficulty.Test]: {
  //   gridSize: 1,
  //   minMoves: 7,
  //   levelsPerTier: 1,
  //   totalLevels: 2,
  //   secondsPerLevel: 10,
  // },
  [Difficulty.Easy]: {
    gridSize: 1,
    minMoves: 7,
    levelsPerTier: 2,
    totalLevels: 10,
    secondsPerLevel: 10,
  },
  [Difficulty.Medium]: {
    gridSize: 1.5,
    minMoves: 7,
    levelsPerTier: 1,
    totalLevels: 15,
    secondsPerLevel: 7,
  },
  [Difficulty.Hard]: {
    gridSize: 2,
    minMoves: 10,
    levelsPerTier: 2,
    totalLevels: 20,
    secondsPerLevel: 7,
  },
}

export interface LevelsByMoves {
  [minMoves: number]: Array<SolvableLevel>;
}

export class World {
  dimensions: Point;
  difficulty: Difficulty;
  progression: Progression;
  levelsByMoves: LevelsByMoves;
  loaded = false;
  onLoad: Promise<World>;
  private registerLoaded = () => { };

  constructor(dimensions: Point, difficulty: Difficulty) {
    this.dimensions = dimensions;
    this.difficulty = difficulty;
    this.progression = ProgressionByDifficulty[difficulty];
    this.levelsByMoves = range(this.progression.totalLevels / this.progression.levelsPerTier)
      .reduce((obj: LevelsByMoves, num) => {
        obj[num + this.progression.minMoves] = [];
        return obj;
      }, {});
    this.onLoad = new Promise((resolve, reject) => {
      this.registerLoaded = () => resolve(this);
    });
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

  async loadNow() {
    while (!this.loaded) {
      this.generateLevels();
    }
    const levels = this.getLevelKeys().reduce((arr: Array<SolvableLevel>, key) => {
      arr.push(...this.levelsByMoves[key]);
      return arr;
    }, []);
    return levels;
  }

  displayName() {
    return Difficulty[this.difficulty];
  }
}

export class WorldLoader {
  loaders: Array<World>;

  constructor(dimensions: Point) {
    this.loaders = [
      // Difficulty.Test,
      Difficulty.Easy,
      Difficulty.Medium,
      Difficulty.Hard,
    ].map(d => new World(dimensions, d));
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
