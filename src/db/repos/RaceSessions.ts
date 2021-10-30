import { BaseRepo, BaseDocument } from "../BaseRepo";

export type RaceSession = {
  user: string;
  started: Date;
  laps: { course: number; lap: number; data: number[][] }[];
} & BaseDocument;

export default class RaceSessionRepo extends BaseRepo<RaceSession> {
  constructor() {
    super("race_data_sessions");
  }
  updateLapData(query: Partial<RaceSession>, lap: RaceSession["laps"][number]) {
    this.collection.updateOne(query, { $push: { laps: lap } });
  }
}
