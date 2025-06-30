"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = __importDefault(require("../utils/config"));
const rootRouter = (0, express_1.Router)();
rootRouter.get("/", (req, res) => {
    res.sendFile(config_1.default.publicIndexHtmlPath);
});
rootRouter.get("/favicon.ico", (req, res) => {
    res.sendFile(config_1.default.publicFaviconPath);
});
exports.default = rootRouter;
