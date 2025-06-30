"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const config = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.MONGO_URL || "",
    jwtSecret: process.env.JWT_SECRET || "",
    publicIndexHtmlPath: path_1.default.join(__dirname, "../../../public/index.html"),
    publicFaviconPath: path_1.default.join(__dirname, "../../../public/favicon.svg"),
};
exports.default = config;
