import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import {
  createCall,
  deleteCall,
  getScheduledCalls,
  getCallData,
} from "../controllers/call/callController.js";
const router = express.Router();

//create link routes
router.get("/create_link", (req, res) => {
  res.render("provider/create_link");
});

router.post("/create_link", authenticateToken, createCall);

//visit summary routes
router.get("/visit_summary", (req, res) => {
  res.render("provider/visitSummary");
});

router.post("/visit_summary", authenticateToken, getCallData);

//scheduled calls routes
router.get("/scheduled_calls", (req, res) => {
  res.render("provider/scheduledCalls");
});

router.get("/load_calls", authenticateToken, getScheduledCalls);

//call history routes
router.get("/call_history", (req, res) => {
  res.render("call_history");
});

//doctor call view
router.get("/doctor_call_view", (req, res) => {
  res.render("doctor_call_view");
});

//delete call
router.delete("/deleteCall", authenticateToken, deleteCall);

export default router;
