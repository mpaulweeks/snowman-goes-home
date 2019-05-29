
export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  clone() {
    return new Point(this.x, this.y);
  }
  toString() {
    return `${this.x},${this.y}`;
  }
  equals(other: Point) {
    return this.toString() === other.toString();
  }

  randomWithin(exclude: Array<Point>) {
    let newPoint;
    const excludeKeys = exclude.reduce((map, p) => {
      map[p.toString()] = true;
      return map;
    }, {});
    while (!newPoint || excludeKeys[newPoint.toString()]) {
      newPoint = new Point(
        Math.floor(Math.random() * this.x),
        Math.floor(Math.random() * this.y)
      );
    }
    return newPoint;
  }
  static fromString(str: string) {
    const parts = str.split(',');
    return new Point(parseFloat(parts[0]), parseFloat(parts[1]));
  }
};
