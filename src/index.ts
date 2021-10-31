import Koa from "koa";
//@ts-ignore
import cors from "@koa/cors";
import router from "./router";

import { connectDatabase } from "./db/connectDb";

const app = new Koa();

const PORT = 4444;

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on: ${PORT}`);
  });
});
