import { Router } from "express";
import UserRoutes from "./userRoutes";
import ProductRoutes from "./productRoutes";
import ProductBannerRoutes from "./productBannerRoutes";
import paypalRouter from "./paypalRoutes";

const router = Router();
router.use(UserRoutes);
router.use(ProductRoutes);
router.use(ProductBannerRoutes);
router.use(paypalRouter);

export default router;
