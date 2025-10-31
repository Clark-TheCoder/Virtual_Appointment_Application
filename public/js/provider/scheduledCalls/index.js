import { deactivateAudio, getAudio } from "../../media/audioController.js";
import { deactivateCamera, getCamera } from "../../media/cameraController.js";
import { loadScheduledCalls } from "./api/loadCalls.js";
import { updateAudioUIOff } from "./precall/buttons/audioButton.js";
import { updateCameraUIOff } from "./precall/buttons/cameraButton.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadScheduledCalls();
});

// Clean up video and audio streams if there are any
// Clean up precall popup and overlay as well
window.addEventListener("pageshow", () => {
  const overlay = document.getElementById("pc_page_overlay");
  const preCallPopup = document.getElementById("pc_popup");
  if ((preCallPopup.style.display = "flex")) {
    preCallPopup.style.display = "none";
    overlay.style.display = "none";
  }

  if (getCamera) {
    deactivateCamera();
    updateCameraUIOff();
  }

  if (getAudio) {
    deactivateAudio();
    updateAudioUIOff();
  }
});
