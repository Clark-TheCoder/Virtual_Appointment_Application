import dotenv from "dotenv";
import { findUserByEmail, createNewUser } from "../../models/user/userModel.js";
import bcrypt from "bcrypt";
dotenv.config();
import { generateToken } from "../../utils/jwt.js";

export async function createUser(req, res) {
  const { firstname, lastname, email, position, password } = req.body;

  if (!firstname || !lastname || !email || !position || !password) {
    return res.status(400).json({
      message: "All fields are required to complete registration.",
    });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createNewUser(
      firstname,
      lastname,
      email,
      position,
      hashedPassword
    );

    if (!newUser) {
      return res.status(400).json({
        message: "Unable to create account. Please try again later.",
      });
    }

    const token = generateToken(newUser);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 8 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "New user created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error: " + error.message });
  }
}
