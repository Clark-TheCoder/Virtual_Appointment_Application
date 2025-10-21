import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function emailCallLink(patientEmail, link) {
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
