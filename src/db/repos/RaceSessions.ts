import { BaseRepo, BaseDocument } from "../BaseRepo";

export type RaceSession = {
  mail: string;
  started: Date;
  courses: { number: number; laps: { number: number; data: number[][] }[] }[];
} & BaseDocument;

export default class RawRaceDataRepo extends BaseRepo<RaceSession> {
  constructor() {
    super("race_data_sessions");
  }
}
