"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_length = exports.isTextOnly = exports.isNumberOnly = exports.trim_value = exports.cv_num = exports.cv_str = exports.lower_text = exports.empty = exports.decryptPassword = exports.encryptPassword = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
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
function empty(data) {
    if (data === null || data === undefined) {
        return true;
    }
    if (typeof data === "string" || Array.isArray(data)) {
        return data.length === 0;
    }
    if (typeof data === "object") {
        return Object.keys(data).length === 0;
    }
    if (typeof data === "number" || typeof data === "boolean") {
        return !data;
    }
    return false;
}
exports.empty = empty;
function lower_text(text) {
    if (!empty(text)) {
        if (typeof text === "number") {
            text = cv_str(text);
        }
        return text.toLowerCase();
    }
    return text;
}
exports.lower_text = lower_text;
function cv_str(data) {
    if (typeof data === "number") {
        return JSON.stringify(data);
    }
    return data;
}
exports.cv_str = cv_str;
function cv_num(data) {
    if (typeof data === "string") {
        return Number(data);
    }
    return data;
}
exports.cv_num = cv_num;
function trim_value(data) {
    if (typeof data === "string") {
        return data.trim();
    }
    else if (typeof data === "number") {
        return data.toString().trim();
    }
    return data;
}
exports.trim_value = trim_value;
function isNumberOnly(data) {
    const str = data.toString();
    const numberOnlyRegex = /^\d+$/;
    return numberOnlyRegex.test(str);
}
exports.isNumberOnly = isNumberOnly;
function isTextOnly(data) {
    const str = data.toString();
    const textOnlyRegex = /^[A-Za-z]+$/;
    return textOnlyRegex.test(str);
}
exports.isTextOnly = isTextOnly;
function check_length(data, length) {
    data = trim_value(data).length;
    return Number(data) === Number(length);
}
exports.check_length = check_length;
