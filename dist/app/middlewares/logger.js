"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
function logger(req, res, next) {
    req.body
        ? console.log(req.method, req.url, req.body)
        : console.log(req.method, req.url);
    next();
}
