import { getProducts } from "../models/getProduct.js";
import { getOneProduct } from "../models/getProduct.js";
/**
 * Get products controller
 * @param {*} req
 * @param {*} res
 */
export async function getProductController(req, res) {
  try {
    const products = await getProducts();
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get one product controller
 * @param {*} req
 * @param {*} res
 */
export async function getOneProductController(req, res) {
  try {
    const product = await getOneProduct(req.params.id);
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}