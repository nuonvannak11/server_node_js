import Stripe from "stripe";
import successPay from "./successPay";
import { Request, Response } from "express";

const stripe = new Stripe(
  "sk_test_51OQsv3HLyy9LNCMM1FHvlIifMjvZzOtUwKdXwNBreC7vfYDa4fwiEuscy12ZgHG9ernQnocnkGQlD4ROFXnEqNmq00boUZzyCo",
  {
    apiVersion: "2023-10-16",
  }
);

interface PaymentType {
  email: string;
  product: any;
}

async function createPayment(
  req: Request,
  res: Response,
  paymentInfo: PaymentType
): Promise<Response | void> {
  try {
    const { email, product } = paymentInfo;
    const returnUrl = "http://localhost:3000/successStripe";

    const stripeCustomer = await stripe.customers.create({
      email: email,
      address: {
        line1: "KK 137 ST",
        postal_code: "10001",
        city: "Kigali",
      },
      shipping: {
        name: "Nishimwe",
        address: {
          line1: "KK 137 ST",
          postal_code: "10001",
          city: "Kigali",
        },
        phone:"0167238687",
      },
      name: "NISHIMWE",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100,
      currency: "usd",
      customer: stripeCustomer.id,
      description: `Purchased ${product.name} for ${product.price}`,
      confirm: true,
      payment_method: "pm_card_visa",
      return_url: returnUrl,
    });

    const response = paymentIntent;
    const response1 = stripeCustomer;
    const data = {
      amount: response.amount,
      amount_received: response.amount_received,
      amount_capturable: response.amount_capturable,
      description: response.description,
      payment_method_types: response.payment_method_types,
      currency: response.currency,
      status: response.status,
      email: response1.email,
      address: response1.address,
      shipping: response1.shipping,
      name: response1.name,
    }

    successPay(req, res, data);

  } catch (error: any) {
    console.error("Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
export default createPayment;

