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

const SucessPayment = {
    Sucess_Pay: async (req: Request, res: Response) => {
        const payerId = req.query.PayerID as string;
        const paymentId = req.query.paymentId as string;

        const execute_payment_json = {
            payer_id: payerId,
        };
        paypal.payment.execute(paymentId, execute_payment_json, (error: any, payment: any) => {
            if (error) {
                console.log(error.response);
                res.status(500).send('Payment execution failed');
            } else {
                const extractedData = {
                    paymentId: payment.id,
                    intent: payment.intent,
                    state: payment.state,
                    payer: {
                        payment_method: payment.payer.payment_method,
                        status: payment.payer.status,
                        payerInfo: {
                            email: payment.payer.payer_info.email,
                            firstName: payment.payer.payer_info.first_name,
                            lastName: payment.payer.payer_info.last_name,
                            payerId: payment.payer.payer_info.payer_id,
                            shippingAddress: payment.payer.payer_info.shipping_address,
                            countryCode: payment.payer.payer_info.country_code,
                        },
                    },
                    transactions: payment.transactions.map((transaction: any) => ({
                        amount: {
                            total: transaction.amount.total,
                            currency: transaction.amount.currency,
                            details: transaction.amount.details,
                        },
                        payee: {
                            merchantId: transaction.payee.merchant_id,
                            email: transaction.payee.email,
                        },
                        description: transaction.description,
                        itemList: {
                            items: transaction.item_list.items,
                            shippingAddress: transaction.item_list.shipping_address,
                        },
                        relatedResources: transaction.related_resources,
                    })),
                    failedTransactions: payment.failed_transactions,
                    createTime: payment.create_time,
                    updateTime: payment.update_time,
                    links: payment.links,
                };
                res.json(extractedData);
            }
        });
    },
};

export default SucessPayment;
