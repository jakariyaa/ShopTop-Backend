import { Response, NextFunction, RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod";
import { CustomRequest } from "../interfaces";

export function validate(schema: ZodSchema): RequestHandler {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        error: (result.error as ZodError).errors,
      });
      return;
    }
    req.validatedData = result.data;
    next();
  };
}
