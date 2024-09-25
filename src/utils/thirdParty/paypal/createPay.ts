import * as paypal from "paypal-rest-sdk";
import { Request, Response } from "express";
import { config } from "dotenv";
config();

const MOD = process.env.MODE_PAYPAL;
const CLIENT_ID = process.env.CLIENT_ID_PAYPAL;
const CLIENT_SECRET = process.env.CLIENT_SECRET_PAYPAL;

if (!MOD || !CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "PayPal credentials are missing. Please check your environment variables."
  );
  process.exit(1);
}

paypal.configure({
  mode: MOD as "sandbox" | "live",
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
});

interface paymentType {
  amount: string;
  qty: number;
  description: string;
  name: string;
  discount: string;
}

const CreatePay = {
  createPay: async (req: Request, res: Response, paymentInfo: paymentType) => {
    const { amount, qty, description, name, discount } = paymentInfo;
    const create_payment_json: paypal.Payment = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: name,
                sku: discount,
                price: amount,
                currency: "USD",
                quantity: qty,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: amount,
          },
          description: description,
        },
      ],
    };

    paypal.payment.create(create_payment_json, (error: any, payment: any) => {
      if (error) {
        console.log(error.response);
        console.log("Erors=============");
        return res.status(500).send("Payment creation failed");
      } else {
        const approvalUrl = payment.links.find(
          (link: any) => link.rel === "approval_url"
        )?.href;
        console.log("Erors=============" + approvalUrl);
            // if (approvalUrl) {
            //   return res.redirect(approvalUrl);
            // } else {
            //   console.error("Approval URL not found");
            //   return res.status(500).send("Approval URL not found");
            // }
      }
    });
  },
};
export default CreatePay;
