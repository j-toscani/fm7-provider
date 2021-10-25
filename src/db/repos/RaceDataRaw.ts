import { Binary } from "bson";
import { BaseRepo, BaseDocument } from "../BaseRepo";

export type RawRaceData = {
  hash: string;
  data: { sub_type: number; buffer: Buffer; position: number }[][];
  started: Date;
  lastModified: Date;
} & BaseDocument;

export default class RawRaceDataRepo extends BaseRepo<RawRaceData> {
  constructor() {
    super("race_data_raw");
  }
}
