import pool from '../createdb.js';
//Get product based on the category name from the controller

//TODO - IMPLEMENT PAGINATION OF THE RETRIEVED RESULTS

const poolPromise = pool.promise()
/**
 * 
 * @param {string} category_name - Name of the category
 */
export async function getProducts (category_name) {
  
try{
  const getProductQuery = 'SELECT * FROM Categories WHERE name = ?';
  const categoryResults = await poolPromise.query(getProductQuery, [category_name])
  req.status(200).json({category_name: categoryResults})
}
catch(error){
resizeBy.status(500).json({'Server error': error})
}
}
module.exports = { getProducts };
