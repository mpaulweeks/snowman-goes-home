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
  getTime(): number {
    return this.milliseconds - this.getElapsed();
  }
  getPercent(): number {
    return this.getTime() / this.milliseconds;
  }
  addTime(time: number) {
    this.milliseconds += time;
  }
  formatElapsed(): string {
    return Math.floor(this.getElapsed() / 1000).toString(10);
  }
  formatRemaining(): string {
    return Math.floor(this.getTime() / 1000).toString(10);
  }
}
