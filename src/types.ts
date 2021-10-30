import Application from "koa";
import Router from "koa-router";

import base from "./encoding/base";
import all from "./encoding/all";

export type V1 = typeof base;
export type V2 = typeof all;

export type BufferKeysV1 = V1[number]["property"];
export type BufferKeysV2 = V2[number]["property"];
export type EncodingsV1 = V1[number]["encoding"];
export type EncodingsV2 = V2[number]["encoding"];

export type KoaContext = Application.ParameterizedContext<
  any,
  Router.IRouterParamContext<any, {}>,
  any
>;
