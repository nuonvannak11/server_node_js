"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const successPay_1 = __importDefault(require("../utils/thirdParty/paypal/successPay"));
const cancelPay_1 = __importDefault(require("../utils/thirdParty/paypal/cancelPay"));
const paypalRouter = express_1.default.Router();
paypalRouter.get('/success', (req, res) => successPay_1.default.Sucess_Pay(req, res));
paypalRouter.get('/cancel', (req, res) => cancelPay_1.default.cancelPay(req, res));
exports.default = paypalRouter;
