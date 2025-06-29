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
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: validator_1.default.isAlphanumeric,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator_1.default.isEmail,
    },
    password: {
        type: String,
        required: true,
        validate: validator_1.default.isStrongPassword,
    },
    age: Number,
    gender: {
        type: String,
        lowercase: true,
        enum: ["male", "female", "others"],
        default: "others",
    },
    role: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["admin", "moderator", "user"],
        default: "user",
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
            return ret;
        },
    },
});
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compareSync(password, this.password);
    });
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
userSchema.post("save", function (doc, next) {
    console.log("User saved:", doc.username);
    next();
});
userSchema.post("deleteOne", function (doc, next) {
    doc && console.log("User removed:", doc.username);
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
