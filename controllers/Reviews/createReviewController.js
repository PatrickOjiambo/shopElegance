//Ensure the user_id and product_id are passed nicely to
// the reviews
import { createReview } from "../../models/ReviewModels/createReview.js";
export async function createReviewController(req, res) {
  try {
    const email = req.user.email;
    const userIdQuery = "SELECT user_id FROM Users WHERE email = ?";
    const userResult = poolPromise.query(userIdQuery, [email]);
    const user_id = userResult[0];
    const { product_id, comment, rating } = req.body;
    const createReviewResults = createReview(
      user_id,
      product_id,
      comment,
      rating
    );
  } catch (error) {
    console.log("Error creating review", error);
  }
}
