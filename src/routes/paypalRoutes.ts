import express, { Request, Response } from 'express';
import SuccessPayment from '../utils/thirdParty/paypal/successPay';
import CancelPay from '../utils/thirdParty/paypal/cancelPay';

const paypalRouter = express.Router();

paypalRouter.get('/success', (req: Request, res: Response) => SuccessPayment.Sucess_Pay(req, res));
paypalRouter.get('/cancel', (req: Request, res: Response) => CancelPay.cancelPay(req, res));
export default paypalRouter;
