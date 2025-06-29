import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(5).max(50),
  price: z.number().min(0),
  quantity: z.number().min(0),
  description: z.string().min(22).max(2222),
  images: z.array(z.string().url()),
  category: z.string(),
  isActive: z.boolean(),
  discount: z.number().min(0),
  ratings: z.number().min(0).max(5),
  sku: z.string(),
  brand: z.string(),
});

export const createProductsSchema = z.array(createProductSchema);

export const updateProductSchema = createProductSchema.partial();
