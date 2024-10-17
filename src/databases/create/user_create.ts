import UserOrder from "../../models/userModelOrder";
import { cv_str } from "../../utils/helperFunctions";

export async function create_order(
  userID: string,
  productID: string,
  productQTY: string,
  productPrice: string,
  product_discount: string,
  payType: string,
  datetime: string
) {
  try {
    const createOrder = await UserOrder.create({
      user_id: cv_str(userID),
      product_id: cv_str(productID),
      qty: cv_str(productQTY),
      amount: cv_str(productPrice),
      discount: cv_str(product_discount),
      pay_type: cv_str(payType),
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
