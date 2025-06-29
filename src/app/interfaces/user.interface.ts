import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  fullname: string;
  username: string;
  email: string;
  password: string;
  age: number;
  gender: "male" | "female" | "others";
  role: "admin" | "merchant" | "customer";
}

export interface IUserInstanceMethods {
  comparePassword(password: string): Promise<boolean>;
}
