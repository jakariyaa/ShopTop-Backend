import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import config from "../utils/config";
import { CustomRequest } from "../interfaces";
import { User } from "../models";

export async function userExtractor(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      req.token = authorization.substring(7);
      const decodedToken = jwt.verify(req.token, config.jwtSecret) as {
        id: string;
      };
      const user = await User.findById(decodedToken.id);
      if (!user) {
        res.status(401).json({ message: "user not found" });
        return;
      }
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "token missing or invalid" });
    }
  } catch (error) {
    next(error);
  }
}
