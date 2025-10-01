import express from "express";
const router = express.Router();

//create link routes
router.get("/create_link", (req, res) => {
  res.render("provider/create_link");
});

//visit summary routes
router.get("/visit_summary", (req, res) => {
  res.render("visit_summary");
});

//scheduled calls routes
router.get("/scheduled_calls", (req, res) => {
  res.render("scheduled_calls");
});

//call history routes
router.get("/call_history", (req, res) => {
  res.render("call_history");
});

//doctor call view
router.get("/doctor_call_view", (req, res) => {
  res.render("doctor_call_view");
});

export default router;
