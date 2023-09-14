import { pool } from "../models/createdb.js";
import { createUser } from "../models/Users.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const poolPromise = pool.promise();
export const register = async (req, res) => {
  const { first_name, last_name, email, phone_number, password } = req.body;

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
      email.toLowerCase(),
      password_hash,
      phone_number
    );

    console.log("Creating user successful", userCreationResult.user_id);

    // Send JWT Token
    const token = JWT.sign({ email }, process.env.TOKEN_SECRET, {
      expiresIn: 3600,
    });
    res.cookie(
      "token",
      token,
      {
        httpOnly: true,
      },
      "email",
      email
    );

    console.log(token);

    // Send a success response with token and email
    return res
      .status(200)
      .json({ message: "User registration successful", token, email });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { log_details, password } = req.body;

    // Check if the user exists with the provided email or phone_number
    const emailQuery = await poolPromise.query(
      "SELECT email, password_hash FROM Users WHERE email = ? OR phone_number = ?",
      [log_details.toLowerCase(), log_details.toLowerCase()]
    );
   

    if (emailQuery[0].length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = emailQuery[0]; // Assuming the first result is the user
    // Compare the hashed password
    
    const passwordMatch = await bcrypt.compare(password, user[0].password_hash);

    if (passwordMatch) {
      // Generate and send a JWT token upon successful login
      const token = JWT.sign({ email: user[0].email }, process.env.TOKEN_SECRET, {
        expiresIn: 3600, // You can adjust the expiration time as needed
      });
      return res.status(200).json({message: 'Successfull login'});


    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
