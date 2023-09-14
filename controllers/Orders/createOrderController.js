import pool from "../createdb.js";
import { createOrder } from "../../models/OrderModels/createOrder.js";
//user_id from session storage or cookies. product_id from the product object.
/**
 *
 * @param {*Request } req - Request should come with product_id and user_id
 * @param {*} res
 */
export async function createOrderControlller(req, res) {
  try {
    const { status, total_amount, product_id, quantity, item_price } = req.body;
    const orderObject = { user_id, status, total_amount };
    const orderItemObjects = { product_id, quantity, item_price };
    const createOrderResults = createOrder(orderObject, orderItemObjects);
    res.status(200).json({ message: "Order creation successfull" });
  } catch (error) {
    res.status(500).json(error);
  }
}
