"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTelegram = void 0;
const axios_1 = __importDefault(require("axios"));
async function sendTelegram() {
    const botToken = "6439993192:AAFoWK6d5u2-7lgFFVTGTsUd2wIN7ko45RI";
    const chatId = "#";
    const messageText = "Hey Bro What ta fuck.";
    const sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
        const response = await axios_1.default.post(sendMessageUrl, {
            chat_id: chatId,
            text: messageText,
        });
        if (response.status !== 200) {
            console.error("Failed to send message:", response.statusText);
        }
    }
    catch (error) {
        const axiosError = error;
        console.error("Error sending message:", axiosError.message);
    }
}
exports.sendTelegram = sendTelegram;
