import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

import dotenv from "dotenv";
import {
  createNewCall,
  getCurrentCalls,
  deleteCallById,
  getCall,
  updateCallNotes,
  updateCallStatus,
  retrieveCalls,
  updateCallStartTime,
  updateCallEndTime,
  validateCall,
} from "../../models/call/callModel.js";
import { stat } from "fs";
import { emailCallLink } from "../../services/mailer/emailService.js";
import { formatDateQuery } from "../../utils/formatDateQuery.js";
dotenv.config();

export async function createCall(req, res) {
  const userId = req.user.id;
  const { firstname, dayOfBirth, email } = req.body;

  if (!userId || !firstname || !dayOfBirth || !email) {
    return res.status(400).json({
      message: "All fields are required to complete create call link.",
    });
  }
  // Create patient alias
  let patientAlias = firstname.slice(0, 2) + dayOfBirth;

  // Create access token for the call
  const roomId = uuidv4();
  const access_token = crypto.randomBytes(16).toString("hex");

  try {
    const link = `http://localhost:3000/call/join/${access_token}`;
    //const link = `https://sophie-unwoeful-ira.ngrok-free.dev/call/join/${access_token}`;

    if (email) {
      const sentEmail = await emailCallLink(email, link);
      if (!sentEmail || sentEmail.error) {
        return res.status(500).json({
          message: "Link failed to send to this email address.",
        });
      }
    }

    const newLink = await createNewCall(
      roomId,
      userId,
      patientAlias,
      access_token
    );

    if (!newLink) {
      return res.status(400).json({
        message: "Unable to generate link at this time.",
      });
    }
    res.status(200).json({
      message: "Link generated successfully and sent to patient.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot generate link at this time. Sign back in and try again.",
    });
  }
}

export async function getScheduledCalls(req, res) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: no user ID." });
  }

  try {
    const todaysCalls = await getCurrentCalls(userId);
    console.log("Calls retrieved:", todaysCalls.length);

    if (!todaysCalls || todaysCalls.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No calls scheduled for today.",
        calls: [],
      });
    }

    // ✅ Return calls array so frontend can render it
    return res.status(200).json({
      success: true,
      message: "Retrieved today's calls.",
      calls: todaysCalls,
    });
  } catch (error) {
    console.error("Error in getScheduledCalls:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve today's calls. Please try again later.",
      error: error.message,
      calls: [],
    });
  }
}

export async function deleteCall(req, res) {
  const { access_token } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Access Denied" });
  }

  try {
    const result = await deleteCallById(access_token, userId);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Call not found or not deleted" });
    }

    return res.status(200).json({ success: true, message: "Call deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getCallData(req, res) {
  const { access_token } = req.body;
  const userId = req.user?.id;

  if (!userId || !access_token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    let callData = await getCall(access_token, userId);

    if (!callData) {
      return res
        .status(400)
        .json({ message: "Could not get call notes at this time." });
    } else {
      return res.status(200).json({
        callData,
      });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ message: "Could not get call notes at this time." });
  }
}

export async function updateCallData(req, res) {
  const { access_token, status, newNotes } = req.body;
  const userId = req.user?.id;

  if (!access_token || !status || !newNotes) {
    return res.status(400).json({
      success: false,
      message: "Unable to submit form with the current criteria.",
    });
  }

  try {
    let notesUpdated = await updateCallNotes(access_token, userId, newNotes);
    if (!notesUpdated) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to update notes." });
    }

    let statusUpdated = await updateCallStatus(access_token, userId, status);
    if (!statusUpdated) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to update status." });
    }

    return res.status(200).json({
      success: true,
      message: "Visit summary and call status updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not get call notes at this time.",
    });
  }
}

export async function getHistoricalCalls(req, res) {
  try {
    const { year, month, day, status, patientAlias } = req.body;

    // Ensure at least one filter is provided
    if (!year && !month && !day && !status && !patientAlias) {
      return res.status(400).json({ message: "No filter criteria provided." });
    }

    const filterCriteria = {};

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    filterCriteria.provider_id = req.user.id;

    // --- Date filtering ---
    const date = {};
    if (year) date.year = year;
    if (month) date.month = month;
    if (day) date.day = day;

    const dateQueryParameters = formatDateQuery(date);
    if (dateQueryParameters) {
      if (dateQueryParameters.exactDate)
        filterCriteria.exactDate = dateQueryParameters.exactDate;
      if (dateQueryParameters.startRange)
        filterCriteria.startRange = dateQueryParameters.startRange;
      if (dateQueryParameters.endRange)
        filterCriteria.endRange = dateQueryParameters.endRange;
    }

    const validStatus = [
      "completed",
      "no_show",
      "cancelled_by_provider",
      "cancelled_by_patient",
    ];
    if (status) {
      if (!validStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid visit status provided." });
      }
      filterCriteria.status = status;
    }

    if (patientAlias) {
      filterCriteria.alias = patientAlias;
    }

    // Retrieve calls
    const retrievedCalls = await retrieveCalls(filterCriteria);

    if (!retrievedCalls) {
      return res
        .status(400)
        .json({ message: "Could not retrieve calls at this time." });
    }

    return res.status(200).json({
      calls: retrievedCalls,
      message:
        retrievedCalls.length > 0
          ? "Calls found."
          : "No calls found that match the provided criteria.",
    });
  } catch (error) {
    console.error("Error retrieving calls:", error);
    return res
      .status(500)
      .json({ message: "Server error while retrieving calls." });
  }
}

export async function startCall(req, res) {
  const { access_token } = req.body;
  const userId = req.user.id;

  if (!access_token || !userId) {
    return res.status(400).json({
      success: false,
      message: "Missing access token or user ID.",
    });
  }

  try {
    const statusUpdated = await updateCallStatus(
      access_token,
      userId,
      "in_progress"
    );

    if (!statusUpdated) {
      return res.status(404).json({
        success: false,
        message: "Failed to update call status or call not found.",
      });
    }

    const startTimeUpdated = await updateCallStartTime(access_token, userId);

    if (startTimeUpdated.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Failed to update call start time.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Call started successfully.",
    });
  } catch (error) {
    console.error("Error starting call:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while starting call.",
    });
  }
}

export async function endCallTime(req, res) {
  const { access_token } = req.body;
  const userId = req.user.id;

  if (!access_token || !userId) {
    return res.status(400).json({
      success: false,
      message: "Missing access token or user ID.",
    });
  }

  try {
    const durationMinutes = await updateCallEndTime(access_token, userId);

    return res.status(200).json({
      success: true,
      message: "Call ended successfully.",
      duration_minutes: durationMinutes,
    });
  } catch (error) {
    console.error("Error ending call:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while ending call.",
    });
  }
}

export async function validatePatient(req, res) {
  const access_token = req.params.access_token;
  try {
    const validCall = await validateCall(access_token);

    if (!validCall) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied or call not found." });
    } else {
      return res
        .status(200)
        .json({ success: true, status: validCall, message: "Call found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
