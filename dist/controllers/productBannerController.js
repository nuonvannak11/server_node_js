"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productBanner_1 = __importDefault(require("../models/productBanner"));
//import { Op } from "sequelize";
const socket_1 = require("../helper/socket");
const getAllProductBanner = async (req, res) => {
    try {
        const allProducts = await productBanner_1.default.findAll();
        const filteredProducts = allProducts.filter((product) => {
            return Object.values(product).every((value) => value !== null);
        });
        if (filteredProducts && filteredProducts.length > 0) {
            socket_1.io.emit("newProductBanner", filteredProducts);
            res.status(200).json({
                code: "1",
                message: "successfully",
                data: filteredProducts,
            });
        }
        else {
            res.status(200).json({ code: "-1", message: "data not found" });
        }
    }
    catch (error) {
        console.error("Error retrieving product banners:", error);
        res.status(500).json({ code: "-500", message: "Internal server error" });
    }
};
const createProductBanner = async (req, res) => {
    const productBannerData = req.body;
    try {
        const newProductBanner = await productBanner_1.default.create(productBannerData);
        const allProductBanner = await productBanner_1.default.findAll();
        socket_1.io.emit("newProductBanner", allProductBanner);
        res.status(201).json({
            message: "Product created successfully",
            product: newProductBanner,
        });
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
};
const deleteProductBanner = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await productBanner_1.default.destroy({
            where: { id: productId },
        });
        if (deletedProduct) {
            socket_1.io.emit("newProductBanner", await productBanner_1.default.findAll());
            res.status(200).json({ message: "Product deleted successfully" });
        }
        else {
            res.status(404).json({ error: "Product not found" });
        }
    }
    catch (error) {
        console.error("Error deleting Product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const updateProductBanner = async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    try {
        const updatedUser = await productBanner_1.default.update({ name, email }, { where: { id: userId } });
        if (updatedUser[0]) {
            socket_1.io.emit("newProductBanner", await productBanner_1.default.findAll());
            res.status(200).json({ message: "User updated successfully" });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const ProductBannerController = {
    getAllProductBanner,
    createProductBanner,
    deleteProductBanner,
    // updateProductBanner,
};
exports.default = ProductBannerController;
