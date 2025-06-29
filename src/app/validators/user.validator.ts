import { z } from "zod";

export const createUserSchema = z.object({
  fullname: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(32),
  age: z.number().min(0),
  gender: z.enum(["male", "female", "others"]).default("others"),
  role: z.enum(["admin", "merchant", "customer"]).default("customer"),
});

export const updateUserSchema = createUserSchema.partial();
