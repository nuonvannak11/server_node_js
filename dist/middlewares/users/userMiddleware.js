"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCardDetails = void 0;
const helperFunctions_1 = require("../../utils/helperFunctions");
function validateCardDetails(cardName, cardNumber, cardEXP, cardCVV, res) {
    // Validate card name
    if ((0, helperFunctions_1.empty)(cardName)) {
        return res.status(200).json({
            code: -9,
            message: "Invalid card name, can't be empty!",
        });
    }
    if (!(0, helperFunctions_1.isTextOnly)(cardName)) {
        return res.status(200).json({
            code: -12,
            message: "Invalid card name, only text is allowed!",
        });
    }
    // Validate card number
    if ((0, helperFunctions_1.empty)(cardNumber)) {
        return res.status(200).json({
            code: -8,
            message: "Invalid card number, can't be empty!",
        });
    }
    if (!(0, helperFunctions_1.isNumberOnly)(cardNumber) || !(0, helperFunctions_1.check_length)(cardNumber, 16)) {
        return res.status(200).json({
            code: -13,
            message: "Invalid card number, must be 16 digits and numeric!",
        });
    }
    // Validate card expiration date
    if ((0, helperFunctions_1.empty)(cardEXP)) {
        return res.status(200).json({
            code: -10,
            message: "Invalid card expiration date, can't be empty!",
        });
    }
    // Validate card CVV
    if ((0, helperFunctions_1.empty)(cardCVV)) {
        return res.status(200).json({
            code: -11,
            message: "Invalid card CVV, can't be empty!",
        });
    }
    if (!(0, helperFunctions_1.isNumberOnly)(cardCVV) || !(0, helperFunctions_1.check_length)(cardCVV, 3)) {
        return res.status(200).json({
            code: -15,
            message: "Invalid card CVV, must be 3 digits and numeric!",
        });
    }
}
exports.validateCardDetails = validateCardDetails;
