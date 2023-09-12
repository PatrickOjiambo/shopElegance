import pool from "../createdb.js";

/**
 *
 * @param {string} product_id - The id of the product to be deleted
 */
export function deleteProduct(product_id) {
    let deleteProductQuery = "DELETE FROM Products WHERE product_id = ?";
    return new Promise((resolve, reject) => {
      poolPromise.query(deleteProductQuery, [product_id], (error, result) => {
        if (error) {
          reject(error);
          return;
        } else {
          resolve(result);
          return;
        }
      });
    });
  }
  module.exports = {deleteProduct}