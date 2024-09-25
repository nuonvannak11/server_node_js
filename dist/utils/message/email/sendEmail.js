"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendUserCode = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function sendEmail(email, text, username) {
    try {
        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;
        if (!user || !pass) {
            throw new Error("Email user or pass not set in environment variables");
        }
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: user,
                pass: pass,
            },
        });
        const subject = "Send Code";
        const htmlContent = text === "success"
            ? `
        <h2>Hello: ${username}</h2>
        <h3>Thanks for restoring your account. <span style="color: red;">Welcome again, beloved customer.</span></h3>
        <h4>Best regards from: Our Store</h4>
      `
            : `
        <h2>Hello: ${username}</h2>
        <h3>This is your code: <span style="color: red;">${text}</span></h3>
        <h4>Best regards from: Our Store</h4>
      `;
        const mailOptions = {
            from: user,
            to: email,
            subject: subject,
            html: htmlContent,
        };
        const info = await transporter.sendMail(mailOptions);
        return {
            code: "1",
            message: "Email sent successfully",
            info: info,
        };
    }
    catch (error) {
        console.error("Error sending email:", error);
        return {
            code: "-1",
            message: `Error sending email: ${error.message}`,
        };
    }
}
function SendUserCode(email, text, username) {
    return sendEmail(email, text, username);
}
exports.SendUserCode = SendUserCode;
