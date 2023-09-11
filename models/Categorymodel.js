import pool from "./createdb.js";
const poolPromise = pool.promise();
/**
 *
 * @param {string} name - Name of the category
 * @returns
 */
export function createCategory(name) {
  let createCategory = "INSERT INTO Categories(name)VALUES (?)";
  return new Promise((resolve, reject) => {
    poolPromise.query(createCategory, [name], (error, result) => {
      if (error) {
        reject(error);
        return;
      } else {
        resolve(result);
      }
    });
  });
}
