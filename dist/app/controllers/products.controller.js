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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
const productsRouter = (0, express_1.Router)();
productsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield models_1.Product.find().populate("seller", { fullname: 1 });
    res.json(products);
}));
productsRouter.post("/", middlewares_1.userExtractor, (0, middlewares_1.validate)(validators_1.createProductSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _b = req.validatedData, { seller } = _b, productInfo = __rest(_b, ["seller"]);
        const product = new models_1.Product(Object.assign(Object.assign({}, productInfo), { seller: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }));
        yield product.save();
        res
            .status(201)
            .json({ message: "Product created successfully", product });
    }
    catch (error) {
        next(error);
    }
}));
//test route for creating multiple products
productsRouter.post("/bulk", middlewares_1.userExtractor, (0, middlewares_1.validate)(validators_1.createProductsSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = req.validatedData;
        products.forEach((product) => {
            var _a;
            product.seller = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        });
        const createdProducts = yield models_1.Product.insertMany(products);
        res.status(201).json({
            message: "Products created successfully",
            products: createdProducts,
        });
    }
    catch (error) {
        next(error);
    }
}));
productsRouter.put("/:id", middlewares_1.userExtractor, (0, middlewares_1.validate)(validators_1.updateProductSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.validatedData, { seller } = _a, productInfo = __rest(_a, ["seller"]);
        const product = yield models_1.Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        product.set(productInfo);
        yield product.save();
        res
            .status(200)
            .json({ message: "Product updated successfully", product });
    }
    catch (error) {
        next(error);
    }
}));
//test for dropping the products collection
productsRouter.delete("/drop", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Product.collection.drop();
    console.log("Products collection dropped.");
    res.status(204).end();
}));
exports.default = productsRouter;
