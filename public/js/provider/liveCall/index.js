import { deactivateAudio } from "../../media/audioController.js";
import { deactivateCamera } from "../../media/cameraController.js";
import { toggleAudioButton } from "./callFunctionality/buttons/liveAudioButton.js";
import { initButtons } from "./callFunctionality/buttons/initButtons.js";
import { toggleCameraButton } from "./callFunctionality/buttons/liveCameraButton.js";

import { setupSidebarToggle } from "./callFunctionality/sidebarFunctionality.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Set up UI functionality
  setupSidebarToggle();
  // setupCallControls(); // will be initButtons
  initButtons();

  // Set inital camera and audio settings
  if (sessionStorage.getItem("cameraSetting") === "true") {
    toggleCameraButton(); // Creates new stream and toggles button to match
  }
  if (sessionStorage.getItem("audioSetting") === "true") {
    toggleAudioButton(); // Creates new stream and toggles button to match
  }

  // get the call's notes
});

window.addEventListener("beforeunload", () => {
  deactivateAudio();
  deactivateCamera();
});
