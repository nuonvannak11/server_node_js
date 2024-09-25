"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const paypal = __importStar(require("paypal-rest-sdk"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const MOD = process.env.MODE_PAYPAL;
const CLIENT_ID = process.env.CLIENT_ID_PAYPAL;
const CLIENT_SECRET = process.env.CLIENT_SECRET_PAYPAL;
if (!MOD || !CLIENT_ID || !CLIENT_SECRET) {
    console.error("PayPal credentials are missing. Please check your environment variables.");
    process.exit(1);
}
paypal.configure({
    mode: MOD,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
});
const CreatePay = {
    createPay: async (req, res, paymentInfo) => {
        const { amount, qty, description, name, discount } = paymentInfo;
        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: "http://localhost:3000/success",
                cancel_url: "http://localhost:3000/cancel",
            },
            transactions: [
                {
                    item_list: {
                        items: [
                            {
                                name: name,
                                sku: discount,
                                price: amount,
                                currency: "USD",
                                quantity: qty,
                            },
                        ],
                    },
                    amount: {
                        currency: "USD",
                        total: amount,
                    },
                    description: description,
                },
            ],
        };
        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                console.log(error.response);
                console.log("Erors=============");
                return res.status(500).send("Payment creation failed");
            }
            else {
                const approvalUrl = payment.links.find((link) => link.rel === "approval_url")?.href;
                console.log("Erors=============" + approvalUrl);
                // if (approvalUrl) {
                //   return res.redirect(approvalUrl);
                // } else {
                //   console.error("Approval URL not found");
                //   return res.status(500).send("Approval URL not found");
                // }
            }
        });
    },
};
exports.default = CreatePay;
