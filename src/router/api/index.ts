import { ObjectId } from "bson";
import Router from "koa-router";
import RaceSessionRepo from "../../db/repos/RaceSessions";

const router = new Router({ prefix: "/api" });

router.get("/sessions", async (ctx) => {
  const repo = new RaceSessionRepo();
  const data = await repo.getMany({}, { projection: { laps: 0 } });
  ctx.response.body = await data.toArray();
});

router.get("/sessions/:id", async (ctx) => {
  const repo = new RaceSessionRepo();
  const minLapData = await repo.collection.aggregate([
    { $match: { _id: new ObjectId(ctx.params.id) } },
    { $project: { "laps.data": 0 } },
  ]);

  ctx.response.body = await minLapData.toArray();
});

router.get("/sessions/:id/:lapsIndex", async (ctx) => {
  const repo = new RaceSessionRepo();
  const minLapData = await repo.collection.aggregate([
    { $match: { _id: new ObjectId(ctx.params.id) } },
    {
      $project: {
        lap: { $arrayElemAt: ["$laps", parseInt(ctx.params.lapsIndex)] },
      },
    },
  ]);

  ctx.response.body = (await minLapData.toArray())[0];
});

export default router;
