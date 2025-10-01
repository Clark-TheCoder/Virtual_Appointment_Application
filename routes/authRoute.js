import express from "express";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("provider/login");
});

router.get("/signup", (req, res) => {
  res.render("provider/signup");
});

export default router;
