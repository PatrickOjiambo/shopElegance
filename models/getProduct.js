import pool from './createdb.js';

//TODO - IMPLEMENT PAGINATION OF THE RETRIEVED RESULTS

const poolPromise = pool.promise()
/**
 * 
 * returns all the products in the database
 */
export async function getProducts () {
  try{
    const getProductsquery = "SELECT Products.product_id as id, Products.name as name, Products.price as price, Images.url as image, AVG(Reviews.rating) as rating, COUNT(Reviews.review_id) as comments_count\
    FROM Products\
    LEFT JOIN Images ON Products.product_id = Images.product_id\
    LEFT JOIN Reviews ON Products.product_id = Reviews.product_id\
    GROUP BY Products.product_id, Products.name, Products.price, Images.url"
    const [rows, fields] = await poolPromise.query(getProductsquery);
    console.log(rows)
    return rows;
  }
  catch(error){
    console.log("Error occured while retrieving products")
    return error.message;
  }
}
/**
 * 
 * @param {String} id 
 * @returns a product with the specified id
 */
export async function getOneProduct(id){
  try{
    const getOneProductquery = "SELECT Products.product_id as id, Products.name as name, Products.description as description, Products.price as price, Images.url as image, AVG(Reviews.rating) as rating, COUNT(Reviews.review_id) as comments_count\
    FROM Products\
    LEFT JOIN Images ON Products.product_id = Images.product_id\
    LEFT JOIN Reviews ON Products.product_id = Reviews.product_id\
    WHERE Products.product_id = ?\
    GROUP BY Products.product_id, Products.name, Products.price, Images.url"
    const [rows, fields] = await poolPromise.query(getOneProductquery, [id]);
    console.log(rows)
    return rows;
  }
  catch(error){
    console.log("Error occured while retrieving products")
    console.log(error.message)
    return error.message;
  }
}

