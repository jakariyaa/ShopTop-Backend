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
exports.userExtractor = userExtractor;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const models_1 = require("../models");
function userExtractor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorization = req.get("authorization");
            if (authorization && authorization.startsWith("Bearer ")) {
                req.token = authorization.substring(7);
                const decodedToken = jsonwebtoken_1.default.verify(req.token, config_1.default.jwtSecret);
                const user = yield models_1.User.findById(decodedToken.id);
                if (!user) {
                    res.status(401).json({ message: "user not found" });
                    return;
                }
                req.user = user;
                next();
            }
            else {
                res.status(401).json({ message: "token missing or invalid" });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
