"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = exports.usersRouter = exports.loginRouter = void 0;
const login_controller_1 = __importDefault(require("./login.controller"));
exports.loginRouter = login_controller_1.default;
const users_controller_1 = __importDefault(require("./users.controller"));
exports.usersRouter = users_controller_1.default;
const posts_controller_1 = __importDefault(require("./posts.controller"));
exports.postsRouter = posts_controller_1.default;
