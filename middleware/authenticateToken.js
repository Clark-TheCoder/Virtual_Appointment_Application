import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  // Get token from cookie
  const token = req.cookies?.token;

  // If there is no token, deny access
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    console.log("Decoded user token.");
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};

export default authenticateToken;
