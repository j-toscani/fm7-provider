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

    const car = {
      id: raceDataOfLap[0][53],
      class: getCarClass(raceDataOfLap[0][54]),
      perfIndex: raceDataOfLap[0][55],
      driveTrain: getDrivetrain(raceDataOfLap[0][56]),
    } as const;

    await repo.updateLapData(
      { user: config.user, started: new Date(config.timeStamp) },
      {
        lap: fileDataEntry.lap,
        course: fileDataEntry.course,
        car,
        data: raceDataOfLap,
      }
    );
  }
}

function getCarClass(carClass: number) {
  switch (carClass) {
    case 0:
      return "E";
    case 1:
      return "D";
    case 2:
      return "C";
    case 3:
      return "B";
    case 4:
      return "A";
    case 5:
      return "S";
    case 6:
      return "R";
    case 7:
      return "P";
    case 8:
      return "X";
    default:
      return "E";
  }
}

function getDrivetrain(drivetrain: number) {
  switch (drivetrain) {
    case 0:
      return "FWD";
    case 1:
      return "RWD";
    case 2:
      return "AWD";
    default:
      return "unknown";
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
