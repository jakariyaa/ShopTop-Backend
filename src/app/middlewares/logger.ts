import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  req.body
    ? console.log(req.method, req.url, req.body)
    : console.log(req.method, req.url);
  next();
}
