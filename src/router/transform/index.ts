import { ObjectId } from "mongodb";
import Router from "koa-router";

import RawRaceDataRepo from "../../db/repos/RaceDataRaw";
import rawToDiskLaps from "../../app/rawToDiskLaps";
import diskLapsToDB from "../../app/diskLapsToDB";

import { KoaContext } from "../../types";

const router = new Router({ prefix: "/transform" });

router.get("/raw-to-laps/:id", saveRawDataToDisk);
router.get("/disk-to-collection/:id", saveDiskDataToCollection);

async function saveRawDataToDisk(ctx: KoaContext) {
  const repo = await new RawRaceDataRepo();
  const data = await repo.getOne({
    _id: new ObjectId(ctx.params.id),
  });

  if (!data) {
    return;
  }

  await rawToDiskLaps(data);
  ctx.response.body = { message: "Data saved successfuly to disk!" };
}

async function saveDiskDataToCollection(ctx: KoaContext) {
  const repo = await new RawRaceDataRepo();
  const data = await repo.getOne({
    _id: new ObjectId(ctx.params.id),
  });

  if (!data) {
    return;
  }

  await diskLapsToDB(data);
  ctx.response.body = { message: "Data saved successfuly to collection!" };
}

export default router;
