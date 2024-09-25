import { Router } from "express";
import ProductController from "../controllers/productController";
import { withTimeout } from "../helper/setTimeOut/setTime";

const ProductRoutes = Router();

//GET ALL PRODUCTS
ProductRoutes.get(
  "/api/products",
  withTimeout(ProductController.getAllProducts, 10000)
);

//GET ONE DATA
ProductRoutes.post(
  "/api/product/get-one",
  withTimeout(ProductController.getOneProduct, 10000)
);

//CREATE PRODUCTS
ProductRoutes.post(
  "/api/product/create",
  withTimeout(ProductController.createProduct, 10000)
);

//DELETE PRODUCT BY ID
ProductRoutes.delete(
  "/api/product/delete/:id",
  withTimeout(ProductController.deleteProduct, 10000)
);

//Update user by ID
// UserRoutes.put("/api/product/update/:id", ProductController.updateUser);

export default ProductRoutes;
