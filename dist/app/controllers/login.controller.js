"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const config_1 = __importDefault(require("../utils/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginRouter = (0, express_1.Router)();
loginRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
loginRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return;
    }
    const user = yield models_1.User.findOne({ username });
    if (!user) {
        res.status(404).json({ error: "username not found" });
        return;
    }
    const isPasswordValid = yield user.comparePassword(password);
    if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid password" });
        return;
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.default.jwtSecret);
    if (isPasswordValid && token) {
        res.status(200).json({ token, username: user.username, id: user._id });
    }
}));
exports.default = loginRouter;
