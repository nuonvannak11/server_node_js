"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controllers/productController"));
const setTime_1 = require("../helper/setTimeOut/setTime");
const ProductRoutes = (0, express_1.Router)();
//GET ALL PRODUCTS
ProductRoutes.get("/api/products", (0, setTime_1.withTimeout)(productController_1.default.getAllProducts, 10000));
//GET ONE DATA
ProductRoutes.post("/api/product/get-one", (0, setTime_1.withTimeout)(productController_1.default.getOneProduct, 10000));
//CREATE PRODUCTS
ProductRoutes.post("/api/product/create", (0, setTime_1.withTimeout)(productController_1.default.createProduct, 10000));
//DELETE PRODUCT BY ID
ProductRoutes.delete("/api/product/delete/:id", (0, setTime_1.withTimeout)(productController_1.default.deleteProduct, 10000));
//Update user by ID
// UserRoutes.put("/api/product/update/:id", ProductController.updateUser);
exports.default = ProductRoutes;
