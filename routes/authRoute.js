import express from "express";
import {
  createUser,
  authenticateUser,
  signoutUser,
} from "../controllers/user/userController.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("provider/login");
});

router.post("/login", authenticateUser);

router.get("/signup", (req, res) => {
  res.render("provider/signup");
});

router.post("/signup", createUser);

router.post("/signout", signoutUser);

export default router;
