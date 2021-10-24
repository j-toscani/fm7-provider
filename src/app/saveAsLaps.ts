import { RawRaceData } from "../db/repos/RaceDataRaw";
import path from "path";
import fs from "fs";

export default async function saveAsLaps(raceData: RawRaceData) {
  const { hash, data } = raceData;
  const filename = getFilename(raceData);

  const pathToDir = path.resolve(__dirname, hash);
  await fs.promises.mkdir(pathToDir, { recursive: true });

  const stream = fs.createWriteStream(path.resolve(pathToDir, filename), {
    flags: "a",
  });
}

const formatter = new Intl.DateTimeFormat("de-DE");

function getFilename(data: RawRaceData) {
  const { started } = data;
  const startedString = formatter.format(started).split(".").join("_");

  return `${startedString}.csv`;
}
