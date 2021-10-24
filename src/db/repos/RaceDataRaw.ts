import { BaseRepo, BaseDocument } from "../BaseRepo";

export type RawRaceData = {
  hash: string;
  data: Uint8Array[];
  started: Date;
  lastModified: Date;
} & BaseDocument;

export default class RawRaceDataRepo extends BaseRepo<RawRaceData> {
  constructor() {
    super("race_data_raw");
  }
}
