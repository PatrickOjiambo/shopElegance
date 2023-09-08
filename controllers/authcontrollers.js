import { pool } from "../models/createdb.js";
import { createUser } from "../models/iUsers.js";
import bcrypt from "bcrypt";

const poolPromise = pool.promise();
export const register = async (req, res) => {
    const { first_name, last_name, email, phone_number, password } = req.body;
    console.log("Happens in register function");
  
    try {
      // Check if the email is already in the database.
      const emailQueryResult = await poolPromise.query(
        "SELECT email FROM Users WHERE email = ?",
        [email]
      );
      if (emailQueryResult[0].length > 0) {
        return res.status(404).json({ error: "Email already exists" });
      }
  
      // Check if the phone number is already in the database.
      const phoneQueryResult = await poolPromise.query(
        "SELECT phone_number FROM Users WHERE phone_number = ?",
        [phone_number]
      );
      if (phoneQueryResult[0].length > 0) {
        return res.status(404).json({ error: "Phone number already exists" });
      }
  
      // Hash the password
      const password_hash = await bcrypt.hash(password, 10);
  
      // Store the user
      const userCreationResult = await createUser(
        first_name,
        last_name,
        email,
        password_hash,
        phone_number
      );
  
      console.log("Creating user successful", userCreationResult.user_id);
  
      // Send JWT Token
      const token = JWT.sign({ username }, process.env.TOKEN_SECRET, {
        expiresIn: 3600,
      });
      console.log(token);
      
      // Send a success response with token and email
      return res.status(200).json({ message: "User registration successful", token, email });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  