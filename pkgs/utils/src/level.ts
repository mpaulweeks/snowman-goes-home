// https://repl.it/@mpaulweeks/ice

import { Move, MoveHistory } from './moves';
import { Point } from './point';

export class Level {
  width: number;
  height: number;
  start: Point;
  win: Point;
  blocks: Array<Point>;

  constructor(width: number, height: number, start: Point, win: Point, blocks: Array<Point>) {
    this.width = width;
    this.height = height;
    this.start = start;
    this.win = win;
    this.blocks = blocks;
  }

  isWinningPoint(loc: Point) {
    return this.win.equals(loc);
  }
  isIllegalPoint(loc: Point) {
    const { blocks, width, height } = this;
    const hitBlock = blocks.some(b => b.equals(loc));
    return hitBlock || (
      (loc.x < 0) ||
      (loc.x >= width) ||
      (loc.y < 0) ||
      (loc.y >= height)
    );
  }
  applyMove(moveHistory: MoveHistory): Point {
    let move = moveHistory.moves[moveHistory.moves.length - 1];
    let current = moveHistory.point;
    while (true) {
      const next = current.clone();

      if (move === Move.Left) next.x--;
      else if (move === Move.Right) next.x++;
      else if (move === Move.Up) next.y--;
      else if (move === Move.Down) next.y++;
      else throw `unexpected move: ${move}`;

      if (this.isWinningPoint(next)) {
        return next;
      }
      if (this.isIllegalPoint(next)) {
        return current;
      }
      current = next;
    }
  }
  solve() {
    const spawn = new MoveHistory(this.start, []);
    const visited = {};
    const queue = [...spawn.getNextMoves()];
    let counter = 0;
    while (counter < 8000 && queue.length) {
      counter++;
      let next = queue.shift() as MoveHistory;
      next.point = this.applyMove(next);
      if (this.isWinningPoint(next.point)) {
        return next;
      }
      const key = next.point.toString();
      if (!visited[key]) {
        queue.push(...next.getNextMoves());
        visited[key] = next;
      }
    }
    return null;
  }

  print() {
    const { width, height, start, win, blocks } = this;
    const grid: Array<Array<string>> = [];
    for (let y = 0; y < height; y++) {
      const row: Array<string> = [];
      for (let x = 0; x < width; x++) {
        let char = '_';
        if (win.x === x && win.y === y) {
          char = 'W';
        }
        if (start.x === x && start.y === y) {
          char = 'S';
        }
        blocks.forEach(b => {
          if (b.x === x && b.y === y) {
            char = '0';
          }
        });
        row.push(char);
      }
      grid.push(row);
    }
    return grid.map(row => row.join('')).join('\n');
  }
}

