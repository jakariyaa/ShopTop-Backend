"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductsSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(5).max(50),
    price: zod_1.z.number().min(0),
    quantity: zod_1.z.number().min(0),
    description: zod_1.z.string().min(22).max(2222),
    images: zod_1.z.array(zod_1.z.string().url()),
    category: zod_1.z.string(),
    isActive: zod_1.z.boolean(),
    discount: zod_1.z.number().min(0),
    ratings: zod_1.z.number().min(0).max(5),
    sku: zod_1.z.string(),
    brand: zod_1.z.string(),
});
exports.createProductsSchema = zod_1.z.array(exports.createProductSchema);
exports.updateProductSchema = exports.createProductSchema.partial();
