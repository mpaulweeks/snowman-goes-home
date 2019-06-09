
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

  static fromString(str: string) {
    const parts = str.split(',');
    return new Point(parseFloat(parts[0]), parseFloat(parts[1]));
  }
};
