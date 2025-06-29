import { Types } from "mongoose";

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  description: string;
  images: string[];
  seller: Types.ObjectId;
  category: string;
  isActive: boolean;
  discount: number;
  ratings: number;
  reviews: Types.ObjectId[];
  sku: string;
  brand: string;
}

export interface IProductQueryParams {
  category?: string;
  isActive?: boolean;
  sortBy?: keyof IProduct;
  sort?: "asc" | "desc";
  limit?: number;
}
