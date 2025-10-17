import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import {
  createCall,
  deleteCall,
  getScheduledCalls,
  getCallData,
  updateCallData,
  getHistoricalCalls,
  startCall,
  endCallTime,
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

router.post("/save_visit_summary", authenticateToken, updateCallData);

//scheduled calls routes
router.get("/scheduled_calls", (req, res) => {
  res.render("provider/scheduledCalls");
});

router.get("/load_calls", authenticateToken, getScheduledCalls);

//call history routes
router.get("/call_history", (req, res) => {
  res.render("provider/callHistory");
});

router.post("/call_history", authenticateToken, getHistoricalCalls);

//delete call
router.delete("/deleteCall", authenticateToken, deleteCall);

//provider starts call
router.post("/doctor/startCall", authenticateToken, startCall);

//provider joins call
router.get("/provider/liveCall", (req, res) => {
  res.render("provider/liveCall");
});

// End call time
router.patch("/end_call_time", authenticateToken, endCallTime);

export default router;
