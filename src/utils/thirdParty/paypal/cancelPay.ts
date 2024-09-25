import { Request, Response } from "express";
const CancelPay = {
  cancelPay: (req: Request, res: Response) => {
    res.send("Payment canceled");
  },
};
export default CancelPay;
