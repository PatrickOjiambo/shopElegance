import pool from "../createdb.js";
//Check the category_id well. Could be a problem
// Provide a corresponding implementation of it elsewhere
const poolPromise = pool.promise();
/**
 *
 * @param {string} name - The product's name
 * @param {string} description - The product's description
 * @param {string} price - The product's price
 * @param {string} stock_quantity - The stock quantity of the product
 * @param {string} category_id - The category_id of the product
 * @param {string} image_url - The url of the product image
 */
export function createProduct(
  name,
  description,
  price,
  stock_quantity,
  category_id,
  image_url
) {
  let createProductQuery =
    "INSERT INTO Products(name, description, price, stock_quantity, category_id) VALUES(?, ?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    poolPromise.query(
      createProductQuery,
      [name, description, price, stock_quantity, category_id],
      (error, result) => {
        if (error) {
          reject(error);
          return;
        } else {
          resolve(result);
          const product_id = result[0].insertId;
          let insertImageQuery =
            "INSERT INTO Images(product_id, url) VALUES(?, ?)";
          return new Promise(
            insertImageQuery,
            [product_id, image_url],
            (error, result) => {
              if (error) {
                reject(error);
                return;
              } else {
                resolve(result);
              }
            }
          );
        }
      }
    );
  });
}

