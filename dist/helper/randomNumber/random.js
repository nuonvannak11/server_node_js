"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomNumber = void 0;
function generateRandomCode(numDigits) {
    if (numDigits <= 0) {
        throw new Error("Number of digits must be a positive integer.");
    }
    let randomCode = "";
    for (let i = 0; i < numDigits; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        randomCode += randomDigit.toString();
    }
    return randomCode;
}
function RandomNumber(data) {
    return generateRandomCode(data);
}
exports.RandomNumber = RandomNumber;
