import { RawRaceData } from "../db/repos/RaceDataRaw";
import fs from "fs";
import readline from "readline";
import path from "path";
import RaceSessionRepo from "../db/repos/RaceSessions";

type DiskDataConfig = {
  user: string;
  timeStamp: number;
};

export default async function diskLapsToDB(raceData: RawRaceData) {
  const config = {
    user: raceData.hash,
    timeStamp: raceData.started.getTime(),
  };

  const fileNames = await getFileNames(config);
  const fileData = getFileData(fileNames);

  fileData.sort((a, b) => a.lap - b.lap).sort((a, b) => a.course - b.course);

  const repo = new RaceSessionRepo();

  await repo.create({
    user: config.user,
    started: new Date(config.timeStamp),
    laps: [],
  });

  for await (const fileDataEntry of fileData) {
    const stream = getFileDataReadStream(fileDataEntry.filename, config);
    const raceDataOfLap = await getArrayFromFileLines(stream);

    await repo.updateLapData(
      { user: config.user, started: new Date(config.timeStamp) },
      {
        lap: fileDataEntry.lap,
        course: fileDataEntry.course,
        data: raceDataOfLap,
      }
    );
  }
}

async function getArrayFromFileLines(
  stream: fs.ReadStream
): Promise<number[][]> {
  const dataToSave = [];
  const lines = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  for await (const line of lines) {
    const data = line.split(",").map((entry) => parseFloat(entry));
    dataToSave.push(data);
  }

  return dataToSave;
}

function getFileData(fileNames: string[]) {
  return fileNames.map((name) => {
    const [lap, course] = name.split(".")[0].split("_").slice(1);
    return {
      filename: name,
      lap: parseInt(lap),
      course: parseInt(course),
    };
  });
}

function getFileDataReadStream(filename: string, config: DiskDataConfig) {
  return fs.createReadStream(
    path.resolve(
      __dirname,
      "../../race_data_files",
      config.user,
      config.timeStamp.toString(),
      filename
    )
  );
}

async function getFileNames(config: { user: string; timeStamp: number }) {
  return fs.promises.readdir(
    path.resolve(
      __dirname,
      "../../race_data_files",
      config.user,
      config.timeStamp.toString()
    )
  );
}
