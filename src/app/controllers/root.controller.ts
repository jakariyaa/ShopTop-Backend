import { Router, Request, Response } from "express";
import path from "path";

const rootRouter = Router();

rootRouter.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../../", "public", "index.html"));
});

export default rootRouter;
