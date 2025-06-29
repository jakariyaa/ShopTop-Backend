import { Router, Request, Response, NextFunction } from "express";
import { Product } from "../models";
import { userExtractor, validate } from "../middlewares";
import { CustomRequest } from "../interfaces";
import {
  createProductSchema,
  createProductsSchema,
  updateProductSchema,
} from "../validators";

const productsRouter = Router();

productsRouter.get("/", async (req: Request, res: Response) => {
  const products = await Product.find().populate("seller", { fullname: 1 });
  res.json(products);
});

productsRouter.post(
  "/",
  userExtractor,
  validate(createProductSchema),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { seller, ...productInfo } = req.validatedData;
      const product = new Product({
        ...productInfo,
        seller: req.user?._id,
      });
      await product.save();
      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (error) {
      next(error);
    }
  }
);

//test route for creating multiple products
productsRouter.post(
  "/bulk",
  userExtractor,
  validate(createProductsSchema),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const products = req.validatedData;
      products.forEach((product: any) => {
        product.seller = req.user?._id;
      });
      const createdProducts = await Product.insertMany(products);
      res.status(201).json({
        message: "Products created successfully",
        products: createdProducts,
      });
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.put(
  "/:id",
  userExtractor,
  validate(updateProductSchema),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { seller, ...productInfo } = req.validatedData;
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      product.set(productInfo);
      await product.save();
      res
        .status(200)
        .json({ message: "Product updated successfully", product });
    } catch (error) {
      next(error);
    }
  }
);

//test for dropping the products collection
productsRouter.delete("/drop", async (req: Request, res: Response) => {
  await Product.collection.drop();
  console.log("Products collection dropped.");
  res.status(204).end();
});

export default productsRouter;
