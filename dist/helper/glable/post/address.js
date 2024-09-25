"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAddressTimeZone = void 0;
const axios_1 = __importDefault(require("axios"));
async function GetAddressTimeZone(ip) {
    try {
        const response = await axios_1.default.get(`https://ipinfo.io/${ip}?token=2be0fa40cccc3c`);
        const data = response.data;
        return data;
    }
    catch (error) {
        console.error("Error fetching geolocation data:", error);
    }
}
exports.GetAddressTimeZone = GetAddressTimeZone;
