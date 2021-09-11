import Koa from "koa";
import serve from "koa-static";
import Router from "koa-router";
import mount from "koa-mount";
import path from "path";
import fs from "fs/promises";

const app = new Koa();
const staticApp = new Koa();
const router = new Router();

const PORT = 33332;

staticApp.use(serve(path.join(__dirname, "../race_data")));

app.use(mount("/downloads", staticApp));

router.get("/", (ctx) => (ctx.body = "Hello you!"));

router.get("/downloads", async (ctx) => {
  const dir = await fs.readdir(path.resolve(__dirname, "../race_data"));
  ctx.body = JSON.stringify(dir);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
