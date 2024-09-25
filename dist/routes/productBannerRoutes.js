"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productBannerController_1 = __importDefault(require("../controllers/productBannerController"));
const ProductBannerRoutes = (0, express_1.Router)();
//GET ALL PRODUCTS BANNER
ProductBannerRoutes.get("/api/products/banner", productBannerController_1.default.getAllProductBanner);
//CREATE PRODUCTS BANNER
ProductBannerRoutes.post("/api/product/banner/create", productBannerController_1.default.createProductBanner);
// DELETE PRODUCT BANNER BY ID
ProductBannerRoutes.delete("/api/product/banner/delete/:id", productBannerController_1.default.deleteProductBanner);
// // Update user by ID
// UserRoutes.put("/api/product/banner/update/:id", ProductBannerController.updateUser);
exports.default = ProductBannerRoutes;
