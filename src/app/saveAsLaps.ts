import fs from "fs";

import { RawRaceData } from "../db/repos/RaceDataRaw";
import all from "../encoding/all";
import decodeBuffer, { createDecoder } from "../encoding/decodeBuffer";
import LapDataHandler from "./LapDataHandler";

export default async function saveAsLaps(raceData: RawRaceData) {
  const laps = new Set();

  const raceDataAsBuffer = getraceDataAsBuffer(raceData);

  const config = {
    hash: raceData.hash,
    started: raceData.started,
    lap: 1,
  };

  const handler = new LapDataHandler(config);
  await fs.promises.mkdir(handler.pathToDir, { recursive: true });

  handler.init();

  for (let index = 0; index < raceDataAsBuffer.length; index++) {
    const entry = raceDataAsBuffer[index];
    const decoder = createDecoder(entry);
    const decodedRaceData = decodeBuffer(entry, decoder);

    laps.add(decodedRaceData[75]);
    // handler.write(decodedRaceData);
  }
  console.log(laps);
  return true;
}

function getraceDataAsBuffer(raceData: RawRaceData) {
  const flatData = raceData.data.flat();
  return flatData.map((data) => data.buffer);
}
