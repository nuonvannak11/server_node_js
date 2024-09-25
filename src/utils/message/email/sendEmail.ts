import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface EmailResponse {
  code: string;
  message: string;
  info?: any;
}

async function sendEmail(
  email: string,
  text: string,
  username: string
): Promise<EmailResponse> {
  try {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      throw new Error("Email user or pass not set in environment variables");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });

    const subject = "Send Code";
    const htmlContent =
      text === "success"
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
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      code: "-1",
      message: `Error sending email: ${(error as Error).message}`,
    };
  }
}

export function SendUserCode(
  email: string,
  text: string,
  username: string
): Promise<EmailResponse> {
  return sendEmail(email, text, username);
}
