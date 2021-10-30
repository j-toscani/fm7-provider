import { ObjectId } from "mongodb";
import Router from "koa-router";
import RawRaceDataRepo from "../db/repos/RaceDataRaw";
import rawToDiskLaps from "../app/rawToDiskLaps";

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
  ctx.response.body = { message: "Data saved successfuly!" };
});

export default router;
