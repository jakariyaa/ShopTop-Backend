import mongoose from "mongoose";
import { IUser, IUserInstanceMethods } from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<
  IUser,
  mongoose.Model<IUser>,
  IUserInstanceMethods
>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isAlphanumeric,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
      validate: [validator.isStrongPassword, "Password must be strong"],
    },
    age: Number,
    gender: {
      type: String,
      lowercase: true,
      enum: ["male", "female", "others"],
      default: "others",
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["admin", "merchant", "customer"],
      default: "customer",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("User saved:", doc.username);
  next();
});

userSchema.post("findOneAndDelete", function (doc, next) {
  doc && console.log("User removed:", doc.username);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
