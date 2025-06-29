"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Validation failed",
                error: result.error.errors,
            });
            return;
        }
        req.validatedData = result.data;
        next();
    };
}
