import { NextFunction, Request, Response, Router } from "express";
import { User } from "../models";
import { userExtractor, validate } from "../middlewares";
import { CustomRequest } from "../interfaces";
import { createUserSchema, updateUserSchema } from "../validators";

const usersRouter = Router();

usersRouter.get("/", async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

usersRouter.post(
  "/",
  validate(createUserSchema),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { role, ...userInfo } = req.validatedData;
      const user = new User({
        ...userInfo,
        role: "customer",
      });
      await user.save();
      res
        .status(201)
        .json({ message: "User created successfully", user: user });
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.delete(
  "/:id",
  userExtractor,
  async (req: CustomRequest, res: Response) => {
    if (req.user?.role !== "admin") {
      res.status(401).json({ message: "Unauthorized action" });
      return;
    }
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "User deleted successfully", user: user });
  }
);

usersRouter.put(
  "/:id",
  userExtractor,
  validate(updateUserSchema),
  async (req: CustomRequest, res: Response) => {
    const { password, role, ...otherFields } = req.validatedData;
    const isAdmin = req.user?.role === "admin";
    const isSelf = req.user?._id.toString() === req.params.id;
    if (!isAdmin && !isSelf) {
      res.status(401).json({
        message: "Unauthorized action. Only admins or user can change own info",
      });
      return;
    } else if (!isAdmin && role) {
      res
        .status(401)
        .json({ message: "Unauthorized action. Only admins can change role" });
      return;
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    user.set({
      ...otherFields,
      ...(password && { password }),
      ...(role && { role }),
    });
    await user.save();
    res.status(200).json({ message: "User updated successfully", user: user });
  }
);

//test whoami
usersRouter.get(
  "/whoami",
  userExtractor,
  async (req: CustomRequest, res: Response) => {
    res.status(200).json(req.user);
  }
);

export default usersRouter;
