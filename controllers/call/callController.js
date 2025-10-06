import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { Resend } from "resend";
import dotenv from "dotenv";
import {
  createNewCall,
  getCurrentCalls,
  deleteCallById,
  getCall,
} from "../../models/call/callModel.js";
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

const resend = new Resend(process.env.RESEND_API_KEY);
async function emailCallLink(patientEmail, link) {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: patientEmail,
      subject: "Your Virtual Appointment Link",
      html: `
        <p>Hello,</p>
        <p>Your secure video call link is below. Click the link to join:</p>
        <p><a href="${link}">${link}</a></p>
        <p>This link is private. Do not share it.</p>
      `,
    });

    return data;
  } catch (error) {
    console.error("Failed to send email via Resend.");
    return { error };
  }
}

export async function getScheduledCalls(req, res) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: no user ID." });
  }

  try {
    const todaysCalls = await getCurrentCalls(userId);

    res.status(200).json({
      message:
        todaysCalls.length === 0 ? "No calls scheduled for today." : "Success",
      calls: todaysCalls,
    });
  } catch (error) {
    res.status(500).json({
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
