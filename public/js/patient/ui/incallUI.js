import { initButtons } from "../livecall/buttons/initButtons.js";

import { getCamera } from "../../media/cameraController.js";
import { getAudio } from "../../media/audioController.js";
import {
  syncCameraButton,
  toggleCameraButton,
} from "../livecall/buttons/liveCameraButton.js";
import { syncAudioButton } from "../livecall/buttons/liveAudioButton.js";

export function showCallUI() {
  const callUI = document.getElementById("call_ui");
  if (callUI) {
    callUI.style.display = "flex";
  }

  let cameraSetting = sessionStorage.getItem("cameraSetting");
  if (cameraSetting === "true") {
    syncCameraButton();
  }

  let audioSetting = sessionStorage.getItem("audioSetting");
  if (audioSetting === "true") {
    syncAudioButton();
  }

  initButtons();
}

export function hideCallUI() {
  const callUI = document.getElementById("call_ui");
  if (callUI) {
    callUI.style.display = "none";
  }
}
