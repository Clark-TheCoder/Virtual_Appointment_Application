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
      secure: false,
      sameSite: "Lax",
      maxAge: 8 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "New user created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function authenticateUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required to complete user authenication.",
    });
  }
  try {
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Login failure. Please try again." });
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res
        .status(400)
        .json({ message: "Login failure. Please try again." });
    }

    // Remove password from user var that will be used in the jwt.js file
    const user = {
      id: existingUser.id,
      email: existingUser.email,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
    };
    const token = generateToken(user);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 8 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
