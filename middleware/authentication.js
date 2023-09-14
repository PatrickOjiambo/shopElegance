import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function isAuthenticated(req, res) {
  const token = req.cookies.token;
  try {
    const user = JWT.verify(token, process.env.TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearcookie("token");
    return res.rediresct("/");
  }
}
