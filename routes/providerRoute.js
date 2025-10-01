import express from "express";
const router = express.Router();

router.get("/edit_user_details", (req, res) => {
  res.render("edit_user_details");
});

router.get("/home", (req, res) => {
  res.render("provider/home");
});

export default router;
