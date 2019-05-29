import { Level, Move, MoveHistory, SolvableLevel } from "ice-puzzle-utils";

export class PlayableLevel {
  level: Level;
  soln: MoveHistory;
  hero: MoveHistory;

  constructor(solved: SolvableLevel) {
    this.level = solved.level;
    this.soln = solved.soln;
    this.hero = new MoveHistory(this.level.start, []);
  }

  moveHero(move: Move) {
    const { level, hero } = this;
    hero.addMove(move);
    const newPoint = level.applyMove(hero);
    hero.updatePoint(newPoint);
  }
}
