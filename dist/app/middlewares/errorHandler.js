"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, req, res, next) {
    console.error(`ErrorCaught: ${error.name} -  ${error.message}`);
    if (error.name === "ValidationError") {
        res.status(400).json({
            message: "Validation error",
            error: error,
        });
        return;
    }
    else if (error.code === 11000) {
        res.status(400).json({
            message: "Duplicate key error",
            error: error,
        });
        return;
    }
    else if (error.name === "JsonWebTokenError") {
        res.status(401).json({
            message: "Unauthorized: Invalid token",
            error: error,
        });
        return;
    }
    next(error);
}
