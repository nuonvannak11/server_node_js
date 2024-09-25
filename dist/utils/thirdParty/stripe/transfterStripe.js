"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const successPay_1 = __importDefault(require("./successPay"));
const stripe = new stripe_1.default("sk_test_51OQsv3HLyy9LNCMM1FHvlIifMjvZzOtUwKdXwNBreC7vfYDa4fwiEuscy12ZgHG9ernQnocnkGQlD4ROFXnEqNmq00boUZzyCo", {
    apiVersion: "2023-10-16",
});
async function createPayment(req, res, paymentInfo) {
    try {
        const { email, product } = paymentInfo;
        const returnUrl = "http://localhost:3000/successStripe";
        const stripeCustomer = await stripe.customers.create({
            email: email,
            address: {
                line1: "KK 137 ST",
                postal_code: "10001",
                city: "Kigali",
            },
            shipping: {
                name: "Nishimwe",
                address: {
                    line1: "KK 137 ST",
                    postal_code: "10001",
                    city: "Kigali",
                },
                phone: "0167238687",
            },
            name: "NISHIMWE",
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.price * 100,
            currency: "usd",
            customer: stripeCustomer.id,
            description: `Purchased ${product.name} for ${product.price}`,
            confirm: true,
            payment_method: "pm_card_visa",
            return_url: returnUrl,
        });
        const response = paymentIntent;
        const response1 = stripeCustomer;
        const data = {
            amount: response.amount,
            amount_received: response.amount_received,
            amount_capturable: response.amount_capturable,
            description: response.description,
            payment_method_types: response.payment_method_types,
            currency: response.currency,
            status: response.status,
            email: response1.email,
            address: response1.address,
            shipping: response1.shipping,
            name: response1.name,
        };
        (0, successPay_1.default)(req, res, data);
    }
    catch (error) {
        console.error("Error:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.default = createPayment;
