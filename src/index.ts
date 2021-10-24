import Koa from "koa";
import router from "./router.ts";

import { connectDatabase } from "./db/connectDb";

const app = new Koa();

const PORT = 4444;

app.use(router.routes()).use(router.allowedMethods());

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on: ${PORT}`);
  });
});
