import { Request, Response } from "express";

export function unknownEndpoint(req: Request, res: Response) {
  res.status(404).json({
    message: "Unknown endpoint reached",
    error: "Path not found",
    path: req.path,
  });
}
