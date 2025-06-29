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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const postsRouter = (0, express_1.Router)();
postsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield models_1.Post.find().populate("author", { username: 1 });
    res.json(posts);
}));
postsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new models_1.Post(req.body);
    yield post.save();
    res.status(201).json(post);
}));
exports.default = postsRouter;
