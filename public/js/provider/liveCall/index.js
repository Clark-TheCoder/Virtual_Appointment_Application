import { deactivateAudio } from "../../media/audioController.js";
import { deactivateCamera } from "../../media/cameraController.js";
import { toggleAudioButton } from "./callFunctionality/buttons/liveAudioButton.js";
import { initButtons } from "./callFunctionality/buttons/initButtons.js";
import { toggleCameraButton } from "./callFunctionality/buttons/liveCameraButton.js";

import { toggleSidebar } from "./callFunctionality/sidebar/toggleSideBar.js";
import { getCallData } from "../../api/fetchCallData.js";
import { getCurrentCall, setCurrentCall } from "./currentCall.js";
import { getNotes } from "./callFunctionality/sidebar/getNotes.js";

const cameraSettings = sessionStorage.getItem("cameraSetting");
const audioSettings = sessionStorage.getItem("audioSetting");
const access_token = sessionStorage.getItem("access_token");

document.addEventListener("DOMContentLoaded", async () => {
  // Set call
  let callData = await getCallData(access_token);
  setCurrentCall(callData);

  // Set up call buttons
  initButtons();

  // Get the call's notes and place in sidebar
  toggleSidebar();
  //await getNotes();
  getNotes();

  // Set inital camera and audio settings
  if (cameraSettings === "true") {
    toggleCameraButton(); // Creates new stream and toggles button to match
  }
  if (audioSettings === "true") {
    toggleAudioButton(); // Creates new stream and toggles button to match
  }
});

window.addEventListener("beforeunload", () => {
  deactivateAudio();
  deactivateCamera();
  const access_token = sessionStorage.getItem("access_token");
  const newNotes = {
    summary: document.getElementById("summary_textarea").value.trim(),
    plan: document.getElementById("plan_textarea").value.trim(),
    notes: document.getElementById("notes_textarea").value.trim(),
  };

  fetch("/call/save_visit_summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token,
      status: getCurrentCall.status,
      newNotes,
    }),
    keepalive: true,
  });
});
