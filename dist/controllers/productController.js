"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("../models/productModel"));
const productItemsModel_1 = __importDefault(require("../models/productItemsModel"));
const prepareItems_1 = __importDefault(require("../helper/product/prepareItems"));
const socket_1 = require("../helper/socket");
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productModel_1.default.findAll();
        socket_1.io.emit("newProducts", allProducts);
        res.status(200).json(allProducts);
    }
    catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const getOneProduct = async (req, res) => {
    let id = req.body.id;
    let parsedId;
    if (typeof id === "string" && (!/^\d+$/.test(id) || (id !== "0" && id.startsWith("0")))) {
        res.status(200).json({ message: "Invalid ID", code: "-1", id: id });
        return;
    }
    else if (typeof id === "number" && id === 0) {
        parsedId = id;
    }
    else {
        parsedId = parseFloat(id);
    }
    try {
        const productData = await productModel_1.default.findOne({
            where: { id: parsedId },
        });
        if (!productData) {
            res.status(200).json({ message: "Product not found", code: "-1" });
            return;
        }
        const productItem = await productItemsModel_1.default.findOne({
            where: { pro_id: parsedId },
        });
        if (!productItem) {
            res.status(200).json({ message: "Items not found", code: "-1" });
            return;
        }
        const dataReturnItem = (0, prepareItems_1.default)(productItem.get());
        const dataProduct = productData.get();
        const datafull = {
            product: dataProduct,
            item: dataReturnItem,
        };
        res.status(200).json({
            message: "success",
            code: "1",
            data: datafull,
        });
    }
    catch (error) {
        res.status(200).json({ message: error, code: "-1" });
    }
};
const createProduct = async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await productModel_1.default.create(productData);
        const allProducts = await productModel_1.default.findAll();
        socket_1.io.emit("newProducts", allProducts);
        res
            .status(201)
            .json({ message: "Product created successfully", product: newProduct });
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
};
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await productModel_1.default.destroy({
            where: { id: productId },
        });
        if (deletedProduct) {
            socket_1.io.emit("newProducts", await productModel_1.default.findAll());
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
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    try {
        const updatedUser = await productModel_1.default.update({ name, email }, { where: { id: userId } });
        if (updatedUser[0]) {
            socket_1.io.emit("newUsers", await productModel_1.default.findAll());
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
const ProductController = {
    getAllProducts,
    createProduct,
    deleteProduct,
    getOneProduct,
    // updateUser,
};
exports.default = ProductController;
