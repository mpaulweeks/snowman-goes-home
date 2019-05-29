import { Level, Move, MoveHistory } from "ice-puzzle-utils";

export class PlayableLevel {
  level: Level;
  hero: MoveHistory;

  constructor(level: Level) {
    this.level = level;
    this.hero = new MoveHistory(level.start, []);
  }

  moveHero(move: Move) {
    const { level, hero } = this;
    hero.addMove(move);
    const newPoint = level.applyMove(hero);
    hero.updatePoint(newPoint);
  }
}
