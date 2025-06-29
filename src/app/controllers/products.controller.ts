import { Router, Request, Response, NextFunction } from "express";
import { Product } from "../models";
import { userExtractor, validate } from "../middlewares";
import { CustomRequest } from "../interfaces";
import {
  createProductSchema,
  createProductsSchema,
  updateProductSchema,
} from "../validators";
import { IProductQueryParams } from "../interfaces/prouduct.interface";

const productsRouter = Router();

productsRouter.get("/", async (req: Request, res: Response) => {
  const {
    category,
    isActive,
    sortBy,
    sort = "asc",
    limit = 10,
  }: IProductQueryParams = req.query;

  const filter: any = {};
  if (category) filter.category = category;
  if (isActive !== undefined) filter.isActive = isActive;

  const products = await Product.find(filter)
    .sort(
      sortBy
        ? {
            [sortBy]: sort,
          }
        : {}
    )
    .limit(limit)
    .populate("seller", {
      fullname: 1,
    });
  res.json({ message: "Products fetched successfully", products });
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
      } else if (product.seller.toString() !== req.user?._id.toString()) {
        res.status(401).json({ message: "Unauthorized action" });
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

// for dropping the products collection for testing
productsRouter.delete(
  "/drop",
  userExtractor,
  async (req: CustomRequest, res: Response) => {
    if (req.user?.role !== "admin") {
      res.status(401).json({ message: "only admins can drop the collection" });
      return;
    }
    await Product.collection.drop();
    console.log("Products collection dropped.");
    res.status(204).end();
  }
);

export default productsRouter;
