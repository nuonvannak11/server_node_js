import { Console, log } from 'console';
import { Request, Response } from 'express';



const successPay = (req: Request, res: Response, data:any): void => {
  const { amount, amount_received, amount_capturable, description, payment_method_types, currency, status,email,address,shipping,name } = data;

  const descriptionValue = description || '';
  const responseData = {
    amount,
    amount_received,
    amount_capturable,
    description: descriptionValue,
    payment_method_types,
    currency,
    status,
    email,
    name,
    address,
    shipping,
  
  };

  log(responseData);
};

export default successPay;



