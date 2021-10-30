import { ObjectId } from "mongodb";
import Router from "koa-router";
import RawRaceDataRepo from "../db/repos/RaceDataRaw";
import rawToDiskLaps from "../app/rawToDiskLaps";
import diskLapsToDB from "../app/diskLapsToDB";

const router = new Router();

router.get("/raw-to-laps/:id", async (ctx) => {
  const repo = await new RawRaceDataRepo();
  const data = await repo.getOne({
    _id: new ObjectId(ctx.params.id),
  });

  if (!data) {
    return;
  }

  await rawToDiskLaps(data);
  ctx.response.body = { message: "Data saved successfuly to disk!" };
});

router.get("/disk-to-collection/:id", async (ctx) => {
  const repo = await new RawRaceDataRepo();
  const data = await repo.getOne({
    _id: new ObjectId(ctx.params.id),
  });

  if (!data) {
    return;
  }

  await diskLapsToDB(data);
  ctx.response.body = { message: "Data saved successfuly to collection!" };
});

export default router;
