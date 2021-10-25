import { RawRaceData } from "../db/repos/RaceDataRaw";
import path from "path";
import fs from "fs";
import decodeBuffer, { createDecoder } from "../encoding/decodeBuffer";

export default async function saveAsLaps(raceData: RawRaceData) {
  const raceDataEntries = getRaceDataEntries(raceData);

  const lapData = getLapData(raceDataEntries);

  return true;
}

function getRaceDataEntries(raceData: RawRaceData) {
  return raceData.data.map((data) => data[0].buffer);
}

function getLapData(raceDataEntries: Buffer[]) {
  const decoder = createDecoder(raceDataEntries[0]);

  const lapsData = [];
  const lapData = [];
  const currentLap = 1;

  for (let index = 0; index < raceDataEntries.length; index++) {
    const entry = raceDataEntries[index];
    const decodedData = decodeBuffer(Buffer.from(entry), decoder);

    if ()
  }
}

async function getWriteStream(hash: string, lap: number) {
  const pathToDir = path.resolve(__dirname, "../../race_data_files", hash);
  await fs.promises.mkdir(pathToDir, { recursive: true });

  return fs.createWriteStream(path.resolve(pathToDir, filename), {
    flags: "a",
  });
}
