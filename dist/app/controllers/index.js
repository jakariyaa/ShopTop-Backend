"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = exports.usersRouter = exports.loginRouter = exports.rootRouter = void 0;
const login_controller_1 = __importDefault(require("./login.controller"));
exports.loginRouter = login_controller_1.default;
const products_controller_1 = __importDefault(require("./products.controller"));
exports.productsRouter = products_controller_1.default;
const root_controller_1 = __importDefault(require("./root.controller"));
exports.rootRouter = root_controller_1.default;
const users_controller_1 = __importDefault(require("./users.controller"));
exports.usersRouter = users_controller_1.default;
