"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    fullname: zod_1.z.string().min(5).max(50),
    username: zod_1.z.string().min(5).max(50),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(32),
    age: zod_1.z.number().min(0),
    gender: zod_1.z.enum(["male", "female", "others"]).default("others"),
    role: zod_1.z.enum(["admin", "merchant", "customer"]).default("customer"),
});
exports.updateUserSchema = exports.createUserSchema.partial();
