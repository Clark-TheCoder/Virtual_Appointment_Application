import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { updateUser } from "../controllers/user/userController.js";
const router = express.Router();

router.get("/edit_user_details", (req, res) => {
  res.render("provider/editUser");
});

router.patch("/edit_user_details", authenticateToken, updateUser);

router.get("/home", (req, res) => {
  res.render("provider/home");
});

export default router;
