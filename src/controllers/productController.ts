import { Request, Response } from "express";
import Product from "../models/productModel";
import ProductItems from "../models/productItemsModel";
import PrepareItems from "../helper/product/prepareItems";
import { io } from "../helper/socket";

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const allProducts = await Product.findAll();
    io.emit("newProducts", allProducts);
    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOneProduct = async (req: Request, res: Response): Promise<void> => {
  let id = req.body.id;
  let parsedId;

  if (typeof id === "string" && (!/^\d+$/.test(id) || (id !== "0" && id.startsWith("0")))) {
    res.status(200).json({ message: "Invalid ID", code: "-1", id: id });
    return;
  } else if (typeof id === "number" && id === 0) {
    parsedId = id;
  } else {
    parsedId = parseFloat(id);
  }

  try {
    const productData = await Product.findOne({
      where: { id: parsedId },
    });

    if (!productData) {
      res.status(200).json({ message: "Product not found", code: "-1" });
      return;
    }

    const productItem = await ProductItems.findOne({
      where: { pro_id: parsedId },
    });

    if (!productItem) {
      res.status(200).json({ message: "Items not found", code: "-1" });
      return;
    }

    const dataReturnItem = PrepareItems(productItem.get());
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
  } catch (error) {
    res.status(200).json({ message: error, code: "-1" });
  }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const productData = req.body;
  try {
    const newProduct = await Product.create(productData);
    const allProducts = await Product.findAll();
    io.emit("newProducts", allProducts);
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.destroy({
      where: { id: productId },
    });

    if (deletedProduct) {
      io.emit("newProducts", await Product.findAll());
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting Product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const { name, email } = req.body;

  try {
    const updatedUser = await Product.update(
      { name, email },
      { where: { id: userId } }
    );

    if (updatedUser[0]) {
      io.emit("newUsers", await Product.findAll());
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
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

export default ProductController;
