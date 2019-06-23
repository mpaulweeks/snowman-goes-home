export class Stopwatch {
  started: Date;
  milliseconds: number;

  constructor(milliseconds = 0) {
    this.started = new Date();
    this.milliseconds = milliseconds;
  }

  getElapsed(): number {
    return new Date().getTime() - this.started.getTime();
  }
  getRemaining(): number {
    return this.milliseconds - this.getElapsed();
  }
  getPercent(): number {
    return this.getRemaining() / this.milliseconds;
  }
  addTime(time: number) {
    this.milliseconds += time;
  }
  formatElapsed(): string {
    return Math.floor(this.getElapsed() / 1000).toString(10);
  }
  formatRemaining(): string {
    return Math.floor(this.getRemaining() / 1000).toString(10);
  }
}
