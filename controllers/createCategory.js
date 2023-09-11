import { pool } from "../models/createdb.js";
import { createCategory } from "../models/Categorymodel.js";
const poolPromise = pool.promise();
export const createCategoryController = async (req, res) => {
  try {
    let { name } = req.body;
    const categoryResult = await createCategory(name);
  } catch (error) {
    res.status(500).json({ error: "Error creating a category" });
  }
};
module.exports = { createCategoryController };
