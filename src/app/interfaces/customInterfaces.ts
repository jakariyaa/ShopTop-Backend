import { Request } from "express";
import { IUser } from "./user.interface";

export interface MongoError extends Error {
  code?: number;
  keyValue?: any;
}

export interface CustomRequest extends Request {
  token?: string;
  user?: IUser;
  validatedData?: any;
}
