"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default.isLength(value, { min: 11, max: 111 }),
            message: "Title must be between 11 and 111 characters long.",
        },
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => validator_1.default.isLength(value, { min: 22, max: 2222 }),
            message: "Content must be between 22 and 2222 characters long.",
        },
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reactions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Reaction",
        },
    ],
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.default = Post;
