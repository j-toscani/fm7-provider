import Router from "koa-router";
import transformRouter from "./transform";

const router = new Router();

transformRouter.prefix("/transform");

router.get(
  "/",
  (ctx) => (ctx.body.message = "This is a cool new message from Base!")
);

router.use(transformRouter.routes(), transformRouter.allowedMethods());

export default router;
