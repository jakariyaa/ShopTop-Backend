"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./app/controllers");
const middlewares_1 = require("./app/middlewares");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(middlewares_1.logger);
app.use("/api/users", controllers_1.usersRouter);
app.use("/api/login", controllers_1.loginRouter);
app.use("/api/products", controllers_1.productsRouter);
app.use(middlewares_1.unknownEndpoint);
app.use(middlewares_1.errorHandler);
exports.default = app;
