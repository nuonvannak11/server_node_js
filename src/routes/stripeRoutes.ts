import express, { Request, Response } from 'express';
import SuccessPayment from '../utils/thirdParty/stripe/successPay';
import CancelPay from '../utils/thirdParty/stripe/cancelPay';

const stripeRouter = express.Router();
const specificData = {
};
stripeRouter.get('/successStripe', (req: Request, res: Response) => SuccessPayment(req, res, specificData));
stripeRouter.get('/cancelStripe', (req: Request, res: Response) => CancelPay.cancelPay(req, res));
export default stripeRouter;