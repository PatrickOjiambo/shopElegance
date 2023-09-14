import pool from "../createdb.js";
//Check that the user_id from the controller is okay. Also check that the product_id
//from the frontend/controller is passed correctly.
const poolPromise = pool.promise();

/**
 *
 * @param {object} orderObject - Contains order details.
 * @param {object} orderItemObjects - Contains order items.
 */
export async function createOrder(orderObject, orderItemObjects) {
  try {
    const { user_id, status, total_amount } = orderObject;
    const { product_id, quantity, item_price } = orderItemObjects;
    let orderQuery =
      "INSERT INTO Orders(user_id, status, total_amount) VALUES(?, ?, ?)";
    const orderResults = await poolPromise.query(orderQuery, [
      user_id,
      status,
      total_amount,
    ]);
    const order_id = orderResults[0].insertId;
    let orderItemsQuery =
      "INSERT INTO Order_items(order_id, product_id, quantity,item_price)";
    const orderItemResults = await poolPromise.query(orderItemsQuery, [
      order_id,
      product_id,
      quantity,
      item_price,
    ]);
  } catch (error) {
    console.log(error);
  }
}
