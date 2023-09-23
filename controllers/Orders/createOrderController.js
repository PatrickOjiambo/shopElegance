import { createOrder } from "../../models/OrderModels/createOrder.js";
import pool from '../../models/createdb.js'

const poolPromise = pool.promise()
//user_id from session storage or cookies. product_id from the product object.
/**
 *
 * @param {*Request } req - Request should come with product_id and user_id
 * @param {Response} res - Response object
 */
export async function createOrderControlller(req, res) {
  try {
    const email = req.user.email
    const userIdQuery = 'SELECT user_id FROM Users WHERE email = ?'
    const userResult = poolPromise.query(userIdQuery, [email])
    const user_id = userResult[0]
    const { status, total_amount, product_id, quantity, item_price } = req.body;
    const orderObject = { user_id, status, total_amount };
    const orderItemObjects = { product_id, quantity, item_price };
    const createOrderResults = createOrder(orderObject, orderItemObjects);
    res.status(200).json({ message: "Order creation successfull" });
  } catch (error) {
    res.status(500).json(error);
  }
}
