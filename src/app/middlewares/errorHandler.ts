import { Request, Response, NextFunction } from "express";
import { MongoError } from "../interfaces";

export function errorHandler(
  error: MongoError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`ErrorCaught: ${error.name} -  ${error.message}`);
  if (error.name === "ValidationError") {
    res.status(400).json({
      message: "Validation error",
      error: error,
    });
    return;
  } else if (error.code === 11000) {
    res.status(400).json({
      message: "Duplicate key error" + error.keyValue,
      error: error,
    });
    return;
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "Unauthorized: Invalid token",
      error: error,
    });
    return;
  }
  res.status(500).json({
    message: error.message || "An unexpected error occurred",
    error: error,
  });
  console.log(error);
}
