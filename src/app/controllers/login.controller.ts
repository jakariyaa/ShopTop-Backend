import { NextFunction, Response, Router } from "express";
import { User } from "../models";
import config from "../utils/config";
import jwt from "jsonwebtoken";
import { validate } from "../middlewares";
import { loginSchema } from "../validators";
import { CustomRequest } from "../interfaces";
import { date } from "zod";
const loginRouter = Router();

loginRouter.get("/", async (req, res) => {});

loginRouter.post(
  "/",
  validate(loginSchema),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.validatedData;
      if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return;
      }

      const user = await User.findOne({ username });
      if (!user) {
        res.status(404).json({ error: "username not found" });
        return;
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid password" });
        return;
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, config.jwtSecret);
      if (isPasswordValid && token) {
        res.status(200).json({
          message: "login successful",
          token,
          username: user.username,
          id: user._id,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

export default loginRouter;
