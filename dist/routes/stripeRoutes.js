"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const successPay_1 = __importDefault(require("../utils/thirdParty/stripe/successPay"));
const cancelPay_1 = __importDefault(require("../utils/thirdParty/stripe/cancelPay"));
const stripeRouter = express_1.default.Router();
const specificData = {};
stripeRouter.get('/successStripe', (req, res) => (0, successPay_1.default)(req, res, specificData));
stripeRouter.get('/cancelStripe', (req, res) => cancelPay_1.default.cancelPay(req, res));
exports.default = stripeRouter;
