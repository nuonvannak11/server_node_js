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
const SucessPayment = {
    Sucess_Pay: async (req, res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            payer_id: payerId,
        };
        paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
            if (error) {
                console.log(error.response);
                res.status(500).send('Payment execution failed');
            }
            else {
                const extractedData = {
                    paymentId: payment.id,
                    intent: payment.intent,
                    state: payment.state,
                    payer: {
                        payment_method: payment.payer.payment_method,
                        status: payment.payer.status,
                        payerInfo: {
                            email: payment.payer.payer_info.email,
                            firstName: payment.payer.payer_info.first_name,
                            lastName: payment.payer.payer_info.last_name,
                            payerId: payment.payer.payer_info.payer_id,
                            shippingAddress: payment.payer.payer_info.shipping_address,
                            countryCode: payment.payer.payer_info.country_code,
                        },
                    },
                    transactions: payment.transactions.map((transaction) => ({
                        amount: {
                            total: transaction.amount.total,
                            currency: transaction.amount.currency,
                            details: transaction.amount.details,
                        },
                        payee: {
                            merchantId: transaction.payee.merchant_id,
                            email: transaction.payee.email,
                        },
                        description: transaction.description,
                        itemList: {
                            items: transaction.item_list.items,
                            shippingAddress: transaction.item_list.shipping_address,
                        },
                        relatedResources: transaction.related_resources,
                    })),
                    failedTransactions: payment.failed_transactions,
                    createTime: payment.create_time,
                    updateTime: payment.update_time,
                    links: payment.links,
                };
                res.json(extractedData);
            }
        });
    },
};
exports.default = SucessPayment;
