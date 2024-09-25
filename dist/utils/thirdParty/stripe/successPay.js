"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const successPay = (req, res, data) => {
    const { amount, amount_received, amount_capturable, description, payment_method_types, currency, status, email, address, shipping, name } = data;
    const descriptionValue = description || '';
    const responseData = {
        amount,
        amount_received,
        amount_capturable,
        description: descriptionValue,
        payment_method_types,
        currency,
        status,
        email,
        name,
        address,
        shipping,
    };
    (0, console_1.log)(responseData);
};
exports.default = successPay;
