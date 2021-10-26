import fs from "fs";
import path from "path";

export default class LapDataHandler {
  hash: string;
  _lap: number;
  started: Date;
  course: number;
  stream: fs.WriteStream | null;

  constructor(options: { hash: string; lap: number; started: Date }) {
    const { hash, lap, started } = options;
    this.hash = hash;
    this._lap = lap;
    this.started = started;
    this.course = 1;
    this.stream = null;
  }

  set lap(val: number) {
    this._lap = val;
    this.stream = this.getWriteStream();
  }

  get lap() {
    return this._lap;
  }

  get pathToDir() {
    return path.resolve(
      __dirname,
      "../../race_data_files",
      `${this.hash}/${this.started.getTime()}${this.course}`
    );
  }

  get fileName() {
    return `Lap_${this.lap}.csv`;
  }

  getWriteStream() {
    return fs.createWriteStream(path.resolve(this.pathToDir, this.fileName), {
      flags: "a",
    });
  }

  write(data: number[]) {
    const toWrite = `${data.join(",")}\n`;
    if (!this.stream) {
      throw Error("Init instance before writing!");
    }
    this.stream.write(toWrite);
  }

  init() {
    this.stream = this.getWriteStream();
  }
}
