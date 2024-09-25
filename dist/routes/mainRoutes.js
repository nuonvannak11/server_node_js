"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const productBannerRoutes_1 = __importDefault(require("./productBannerRoutes"));
const paypalRoutes_1 = __importDefault(require("./paypalRoutes"));
const router = (0, express_1.Router)();
router.use(userRoutes_1.default);
router.use(productRoutes_1.default);
router.use(productBannerRoutes_1.default);
router.use(paypalRoutes_1.default);
exports.default = router;
