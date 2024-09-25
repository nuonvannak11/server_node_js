"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPassword = exports.encryptPassword = exports.cv_str = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
function cv_str(data) {
    if (typeof data === "number") {
        return JSON.stringify(data);
    }
    else {
        return data;
    }
}
exports.cv_str = cv_str;
function encrypt(data) {
    const SECRET_KEY = "1245763dhewdgvkjh@$%$(+:/^&*!@'-_";
    const KEY_SCRIPT = "345gvkjh@$%$(+:/^&*!@'hjtesz";
    const IV_SCRIPT = "35g@$%$(+:/^&*!@'hjt64sz";
    const combinedKey = crypto_js_1.default.SHA256(SECRET_KEY + KEY_SCRIPT)
        .toString(crypto_js_1.default.enc.Hex)
        .slice(0, 52);
    const cipher = crypto_js_1.default.AES.encrypt(cv_str(data), crypto_js_1.default.enc.Utf8.parse(combinedKey), {
        iv: crypto_js_1.default.enc.Utf8.parse(IV_SCRIPT),
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return cipher.toString();
}
function decrypt(data) {
    const SECRET_KEY = "1245763dhewdgvkjh@$%$(+:/^&*!@'-_";
    const KEY_SCRIPT = "345gvkjh@$%$(+:/^&*!@'hjtesz";
    const IV_SCRIPT = "35g@$%$(+:/^&*!@'hjt64sz";
    const combinedKey = crypto_js_1.default.SHA256(SECRET_KEY + KEY_SCRIPT)
        .toString(crypto_js_1.default.enc.Hex)
        .slice(0, 52);
    const bytes = crypto_js_1.default.AES.decrypt(cv_str(data), crypto_js_1.default.enc.Utf8.parse(combinedKey), {
        iv: crypto_js_1.default.enc.Utf8.parse(IV_SCRIPT),
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    const decryptedData = bytes.toString(crypto_js_1.default.enc.Utf8);
    return decryptedData;
}
function encryptPassword(data) {
    const encryptedPassword = encrypt(data);
    return encryptedPassword;
}
exports.encryptPassword = encryptPassword;
function decryptPassword(passwordData) {
    try {
        const data = decrypt(passwordData);
        return { data: `${200}#${data}` };
    }
    catch (error) {
        if (error instanceof Error &&
            error.code === "ERR_OSSL_BAD_DECRYPT") {
            return { data: `${-500}#ERR_OSSL_BAD_DECRYPT` };
        }
        else {
            return { data: `${-10}#Try again, bruh!` };
        }
    }
}
exports.decryptPassword = decryptPassword;
