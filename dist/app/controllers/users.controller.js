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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.find();
    res.json(users);
}));
usersRouter.post("/", (0, middlewares_1.validate)(validators_1.createUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.validatedData, { role } = _a, userInfo = __rest(_a, ["role"]);
        const user = new models_1.User(Object.assign(Object.assign({}, userInfo), { role: "customer" }));
        yield user.save();
        res
            .status(201)
            .json({ message: "User created successfully", user: user });
    }
    catch (error) {
        next(error);
    }
}));
usersRouter.delete("/:id", middlewares_1.userExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
        res.status(401).json({ message: "Unauthorized action" });
        return;
    }
    const user = yield models_1.User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "User deleted successfully", user: user });
}));
usersRouter.put("/:id", middlewares_1.userExtractor, (0, middlewares_1.validate)(validators_1.updateUserSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const _c = req.validatedData, { password, role } = _c, otherFields = __rest(_c, ["password", "role"]);
    const isAdmin = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin";
    const isSelf = ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString()) === req.params.id;
    if (!isAdmin && !isSelf) {
        res.status(401).json({
            message: "Unauthorized action. Only admins or user can change own info",
        });
        return;
    }
    else if (!isAdmin && role) {
        res
            .status(401)
            .json({ message: "Unauthorized action. Only admins can change role" });
        return;
    }
    const user = yield models_1.User.findById(req.params.id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    user.set(Object.assign(Object.assign(Object.assign({}, otherFields), (password && { password })), (role && { role })));
    yield user.save();
    res.status(200).json({ message: "User updated successfully", user: user });
}));
//test whoami
usersRouter.get("/whoami", middlewares_1.userExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(req.user);
}));
exports.default = usersRouter;
