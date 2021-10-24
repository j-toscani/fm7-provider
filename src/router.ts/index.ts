import { ObjectId } from "mongodb";
import Router from "koa-router";
import RawRaceDataRepo from "../db/repos/RaceDataRaw";
import saveAsLaps from "../app/saveAsLaps";

const router = new Router();

router.get("/raw-to-laps/:id", async (ctx) => {
  const repo = await new RawRaceDataRepo();
  const data = await repo.getOne({
    _id: new ObjectId(ctx.params.id),
  });

  if (!data) {
    return;
  }

  saveAsLaps(data);
});

export default router;
