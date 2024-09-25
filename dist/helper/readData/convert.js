"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertData = void 0;
const helperFunctions_1 = require("../../utils/helperFunctions");
function encryptSensitiveFields(text) {
    const sensitiveFields = [
        "id",
        "name",
        "password",
        "tel",
        "email",
        "address",
        "telegram",
        "bankacc",
        "bankno",
        "salary",
        "contact_us",
    ];
    const encryptedData = {};
    for (const key of Object.keys(text)) {
        const value = text[key];
        if (sensitiveFields.includes(key)) {
            encryptedData[key] = (0, helperFunctions_1.encryptPassword)(String(value));
        }
        else {
            encryptedData[key] = value;
        }
    }
    return encryptedData;
}
function convertData(data) {
    return encryptSensitiveFields(data);
}
exports.convertData = convertData;
