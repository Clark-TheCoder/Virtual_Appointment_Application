import { deactivateAudio, getAudio } from "../../media/audioController.js";
import { deactivateCamera, getCamera } from "../../media/cameraController.js";
import { loadScheduledCalls } from "./api/loadCalls.js";
import { updateAudioUIOff } from "./precall/buttons/audioButton.js";
import { updateCameraUIOff } from "./precall/buttons/cameraButton.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadScheduledCalls();
});

// Clean up video and audio streams if there are any
window.addEventListener("pageshow", () => {
  if (getCamera) {
    deactivateCamera();
    updateCameraUIOff();
  }

  if (getAudio) {
    deactivateAudio();
    updateAudioUIOff();
  }
});
