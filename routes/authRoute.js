import express from "express";
import { createUser } from "../controllers/user/userController.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("provider/login");
});

router.get("/signup", (req, res) => {
  res.render("provider/signup");
});

router.post("/signup", createUser);

export default router;
