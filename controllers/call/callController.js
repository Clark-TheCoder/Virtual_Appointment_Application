// export async function createCall(req, res) {
//   const userId = req.user.id;

//   const { firstname, dayOfBirth, email } = req.body;
//   const patientAlias = generatePatientAlias(firstname, dayOfBirth);

//   const roomId = uuidv4();
//   const access_token = crypto.randomBytes(16).toString("hex");

//   try {
//     const link = `http://localhost:3000/call/join/${access_token}`;

//     if (email) {
//       const sentEmail = await emailCallLink(email, link);
//       if (!sentEmail || sentEmail.error) {
//         return res.status(500).json({
//           message: "Link failed to send to this email address",
//         });
//       }
//     }
//     const newLink = await createCall(
//       roomId,
//       userId,
//       patientAlias,
//       access_token
//     );
//     res.status(200).json({
//       message: "Link generated successfully and sent to patient",
//       link: link,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Cannot generate link at this time. Sign back in and try again.",
//     });
//   }
// }
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { Resend } from "resend";
import dotenv from "dotenv";
import { createNewCall } from "../../models/call/callModel.js";
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
          message: "Link failed to send to this email address",
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
      res.status(400).json({
        message: "Unable to generate link at this time.",
      });
    }
    res.status(200).json({
      message: "Link generated successfully and sent to patient",
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
