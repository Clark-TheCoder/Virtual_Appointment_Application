# WellWave Health Video Appointment Application

**Developer:** Emma Clark  
**Target Audience:** Nova Scotia Health / Healthcare Providers  
**Purpose:** Secure Online Doctor-Patient Consultations

---

## Overview

WellWave Health is a conceptualized secure video chat application designed to be used alongside existing in-office scheduling systems. Its purpose is to help doctors in Nova Scotia conduct online consultations safely, efficiently, and without compromising patient data privacy.

Unlike Maple, which primarily serves patients, WellWave allows patients to connect with doctors online in a secure environment. Doctors currently rely on phones, Teams, Zoom, or other platforms that are not optimized for patient care and can be confusing for patients managing multiple doctors across different systems.

---

## Current Features

- User authentication (JWT + cookies)
- Clinical provider account creation & login
- UI for doctor/patient video chat screen
- Notes panel for call summaries & care plans
- Patient alias system (no personal identifiers stored)
- WebRTC for real-time video and audio
- Socket.io for signaling and real-time communication
- Resend API for emailing patients

---

## Technologies Used

- HTML / CSS / JavaScript
- Node.js + Express
- SQL (for account and call log storage)
- JWT (for authentication)
- Cookies (for session handling)

---

## Running the App Locally (Development)

1. Clone the project folder.
2. Run `npm install` to install dependencies.
3. Use `npm run devStart` to launch the app.
4. Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Note

This project is an improved version of a previous iteration (hidden). Commit history may appear condensed/not standard, as a significant portion of the initial development and detailed commit work was completed in a prior private version of this project.

---

Thank you for reviewing my project!  
Feel free to contact me with any questions.
