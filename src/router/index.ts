import Router from "koa-router";
import transformRouter from "./transform";
import apiRouter from "./api";

const router = new Router();

[apiRouter, transformRouter].forEach((route) =>
  router.use(route.routes(), route.allowedMethods())
);

export default router;
