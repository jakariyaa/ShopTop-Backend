import mongoose from "mongoose";
import { IProduct } from "../interfaces";
import validator from "validator";

const prouductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) =>
          validator.isLength(value, { min: 5, max: 50 }),
        message: "Name must be between 5 and 50 characters long",
      },
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be greater than 0"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity must be greater than 0"],
    },
    description: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) =>
          validator.isLength(value, { min: 22, max: 2222 }),
        message: "Description must be between 22 and 2222 characters long",
      },
    },
    images: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value: string) => validator.isURL(value),
          message: "Image must be a valid URL",
        },
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount must be greater than 0"],
    },
    ratings: {
      type: Number,
      default: 0,
      min: [0, "Ratings must be greater than 0"],
      max: [5, "Ratings must be less than 5"],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

prouductSchema.virtual("reviewsCount").get(function () {
  return this.reviews.length;
});

prouductSchema.virtual("finalPrice").get(function (this: IProduct) {
  return this.price - (this.price * this.discount) / 100;
});

const Product = mongoose.model<IProduct>("Product", prouductSchema);
export default Product;
