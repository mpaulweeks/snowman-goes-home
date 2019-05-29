import { Point } from "./Point";

export enum Move {
  Up = 1,
  Down,
  Left,
  Right,
};
export const Moves = Object
  .keys(Move)
  .filter(k => isNaN(Number(k)))
  .map(k => Move[k]);

export class MoveHistory {
  point: Point;
  moves: Array<Move>;

  constructor(point: Point, moves: Array<Move>) {
    this.point = point;
    this.moves = moves;
  }

  last() {
    return this.moves[this.moves.length - 1]
  }

  getNextMoves() {
    const last = this.last();
    return Moves
      .filter(m => m !== last)
      .map(m => new MoveHistory(
        this.point,
        [...this.moves, m]
      ));
  }

  printMoves() {
    return this.moves.map(k => Move[k]).join(', ');
  }
}
