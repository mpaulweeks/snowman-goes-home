import { Point } from "./point";

export enum Move {
  Up = 1,
  Down,
  Left,
  Right,
};
export const Moves = [
  Move.Up,
  Move.Down,
  Move.Left,
  Move.Right,
];

export interface PotentialMove {
  move: Move,
  history: PointHistory,
};

export class PointHistory {
  point: Point;
  points: Array<Point>;
  moves: Array<Move>;

  constructor(point: Point, points: Array<Point>, moves: Array<Move>) {
    this.point = point;
    this.points = points;
    this.moves = moves;
  }

  addMove(newPoint: Point, move: Move) {
    this.points.push(this.point);
    this.moves.push(move);
    this.point = newPoint;
  }

  getNextMoves(): Array<PotentialMove> {
    return Moves
      .map(m => ({
        move: m,
        history: this.clone(),
      }));
  }

  clone() {
    return new PointHistory(
      this.point,
      [...this.points],
      [...this.moves]
    );
  }

  printMoves() {
    return this.moves.map(k => Move[k]).join(', ');
  }
}
