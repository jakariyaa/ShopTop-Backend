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
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.find();
    res.json(users);
}));
usersRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new models_1.User(req.body);
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
}));
usersRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.deleteOne({ _id: req.params.id });
    res.status(204).end();
}));
exports.default = usersRouter;
