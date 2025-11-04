import { deactivateAudio, getAudio } from "../media/audioController.js";
import { deactivateCamera, getCamera } from "../media/cameraController.js";
import { getPeerConnection } from "../webrtc/peerConnection.js";
import { startPolling } from "./polling/poll.js";
import { updateAudioUIOff } from "./precall/buttons/audioButton.js";
import { updateCameraUIOff } from "./precall/buttons/cameraButton.js";
import { showLoadingScreen } from "./ui/loadingScreenUI.js";

document.addEventListener("DOMContentLoaded", async () => {
  showLoadingScreen();
  await startPolling();
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
