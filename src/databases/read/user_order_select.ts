import Product from "../../models/productModel";
import UserOrder from "../../models/userModelOrder";

export async function getUserOrdersWithProducts(userId: any) {
  try {
    const orders = await UserOrder.findAll({
      where: {
        user_id: userId,
      },
    });

    const plainData = await Promise.all(
      orders.map(async (order) => {
        const orderData = order.get({ plain: true });
        const data_product = await Product.findOne({
          where: { id: orderData.product_id },
        });
        const productData = data_product
          ? data_product.get({ plain: true })
          : {};
        return { ...orderData, productData };
      })
    );
    return plainData;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getUserOrdersWithProductsAll() {
  try {
    const orders = await UserOrder.findAll();

    const plainData = await Promise.all(
      orders.map(async (order) => {
        const orderData = order.get({ plain: true });
        const data_product = await Product.findOne({
          where: { id: orderData.product_id },
        });
        const productData = data_product
          ? data_product.get({ plain: true })
          : {};
        return { ...orderData, productData };
      })
    );
    return plainData;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
