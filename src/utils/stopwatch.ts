export class Stopwatch {
  started: Date;
  milliseconds: number;

  constructor(milliseconds: number) {
    this.started = new Date();
    this.milliseconds = milliseconds;
  }

  getTime(): number {
    const elapsed = new Date().getTime() - this.started.getTime();
    return this.milliseconds - elapsed;
  }
  getPercent(): number {
    return this.getTime() / this.milliseconds;
  }
  addTime(time: number) {
    this.milliseconds += time;
  }
}
