"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = unknownEndpoint;
function unknownEndpoint(req, res) {
    res.status(404).json({
        message: "Unknown endpoint reached",
        error: "Path not found",
        path: req.path,
    });
}
