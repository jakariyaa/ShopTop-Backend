import { Router, Request, Response } from "express";
import config from "../utils/config";

const rootRouter = Router();

rootRouter.get("/", (req: Request, res: Response) => {
  res.sendFile(config.publicIndexHtmlPath);
});

rootRouter.get("/favicon.ico", (req: Request, res: Response) => {
  res.sendFile(config.publicFaviconPath);
});

export default rootRouter;
