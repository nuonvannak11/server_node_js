import { Router } from "express";
import ProductBannerController from "../controllers/productBannerController";

const ProductBannerRoutes = Router();

//GET ALL PRODUCTS BANNER
ProductBannerRoutes.get("/api/products/banner", ProductBannerController.getAllProductBanner);

//CREATE PRODUCTS BANNER
ProductBannerRoutes.post("/api/product/banner/create", ProductBannerController.createProductBanner);

// DELETE PRODUCT BANNER BY ID
ProductBannerRoutes.delete("/api/product/banner/delete/:id", ProductBannerController.deleteProductBanner);

// // Update user by ID
// UserRoutes.put("/api/product/banner/update/:id", ProductBannerController.updateUser);

export default ProductBannerRoutes;

