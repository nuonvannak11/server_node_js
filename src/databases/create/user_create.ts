import UserOrder from "../../models/userModelOrder";
import { cv_num, cv_str } from "../../utils/helperFunctions";

export async function create_order(
  userID: number,
  productID: number,
  productQTY: string,
  productPrice: string,
  product_discount: string,
  payType: string,
  datetime: string
) {
  try {
    const createOrder = await UserOrder.create({
      user_id: cv_num(userID),
      product_id: cv_num(productID),
      qty: cv_str(productQTY),
      amount: cv_str(productPrice),
      discount: cv_str(product_discount),
      pay_type: cv_str(payType),
      status: cv_str("pending"),
      delivery: cv_str("on factory"),
      create_at: cv_str(datetime),
      update_at: cv_str(datetime),
    });

    if (createOrder) {
      return {
        code: 1,
      };
    } else {
      return {
        code: -1,
      };
    }
  } catch (error) {
    return {
      code: -1,
    };
  }
}
