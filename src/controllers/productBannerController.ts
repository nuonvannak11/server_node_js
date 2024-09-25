import { Request, Response } from "express";
import ProductBanner from "../models/productBanner";
//import { Op } from "sequelize";
import { io } from "../helper/socket";

const getAllProductBanner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allProducts = await ProductBanner.findAll();
    const filteredProducts = allProducts.filter((product) => {
      return Object.values(product).every((value) => value !== null);
    });

    if (filteredProducts && filteredProducts.length > 0) {
      io.emit("newProductBanner", filteredProducts);
      res.status(200).json({
        code: "1",
        message: "successfully",
        data: filteredProducts,
      });
    } else {
      res.status(200).json({ code: "-1", message: "data not found" });
    }
  } catch (error) {
    console.error("Error retrieving product banners:", error);
    res.status(500).json({ code: "-500", message: "Internal server error" });
  }
};

const createProductBanner = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productBannerData = req.body;
  try {
    const newProductBanner = await ProductBanner.create(productBannerData);
    const allProductBanner = await ProductBanner.findAll();
    io.emit("newProductBanner", allProductBanner);
    res.status(201).json({
      message: "Product created successfully",
      product: newProductBanner,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

const deleteProductBanner = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductBanner.destroy({
      where: { id: productId },
    });

    if (deletedProduct) {
      io.emit("newProductBanner", await ProductBanner.findAll());
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting Product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProductBanner = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;
  const { name, email } = req.body;

  try {
    const updatedUser = await ProductBanner.update(
      { name, email },
      { where: { id: userId } }
    );

    if (updatedUser[0]) {
      io.emit("newProductBanner", await ProductBanner.findAll());
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
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

export default ProductBannerController;
