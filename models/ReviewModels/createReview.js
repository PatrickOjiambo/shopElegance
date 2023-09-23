import pool from "./createdb.js";
const poolPromise = pool.promise();


/**
 * 
 * @param {integer} user_id - the id of the current user
 * @param {integer} product_id  - The id of the product
 * @param {string} comment - User comments concerning product
 * @param {float} rating - User rating of the product
 */
export async function createReview(user_id, product_id, comment, rating) {
  try{
    const createReviewQuery =
    "INSERT INTO Reviews(user_id, product_id, rating, comment) VALUES(?, ?, ?, ?)";
  const reviewResults = await poolPromise.query(createReviewQuery, [
    user_id,
    product_id,
    comment,
    rating,
  ]);
  }
  catch(error){
    console.log("Error creating review", error)
  }
}
