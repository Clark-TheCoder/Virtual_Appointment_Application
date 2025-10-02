import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generateToken(user) {
  return jwt.sign(
    {
      id: Number(user.id),
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
}
