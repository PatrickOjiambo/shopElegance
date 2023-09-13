import { pool } from "../../models/createdb.js";
import { createProduct } from "../../models/ProductModels/createProduct.js";
import { handleImageUpload } from "../../middleware/imageUpload.js";

const poolPromise = pool.promise();
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category_name } =
      req.body;
    const categoryIdResult = await poolPromise.query(
      "SELECT category_id FROM Categories WHERE name = ?",
      [category_name]
    );

    if (categoryIdResult[0].length < 1) {
      return res.status(404).json({ error: `${category_name} does not exist` });
    } else {
      let category_id = categoryIdResult[0];
      category_id = category_id[0].category_id;
      const image_url = await handleImageUpload(req, res);
      const imageFile = req.file;
      const productResult = await createProduct(
        name,
        description,
        parseFloat(price),
        stock_quantity,
        category_id,
        image_url
      );
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};
