import { pool } from "../../models/createdb.js";
import { createProduct } from "../../models/ProductModels/createProduct.js";
import { handleImageUpload } from "../../middleware/imageUpload.js";

const poolPromise = pool.promise();
export const createProductController = async (req, res) => {
  try {
    let { name, description, price, stock_quantity, category_name } = req.body;
    let category_id = await poolPromise.query(
      "SELECT category_id FROM Categories WHERE name = ?",
      [category_name]
    );
    if (category_id[0].length < 1) {
      return res.status(404).json({ error: "Category does not exist" });
    }
    const imageFile = req.file;

    const image_url = handleImageUpload(imageFile);
    const productResult = await createProduct(
      name,
      description,
      price,
      stock_quantity,
      category_id,
      image_url
    );
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};
