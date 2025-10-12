import {
  audioStream,
  deactivateAudio,
} from "../../../../media/audioController.js";
import {
  cameraStream,
  deactivateCamera,
} from "../../../../media/cameraController.js";
import { startCall } from "../../api/startCall.js";
import { updateAudioUIOff } from "./audioButton.js";
import { updateCameraUIOff } from "./cameraButton.js";

export function createJoinButton() {
  const joinButton = document.getElementById("join_call_button");
  joinButton.addEventListener("click", joinCall);
}

async function joinCall() {
  // api calls
  let isCallStarted = await startCall();

  if (isCallStarted) {
    if (cameraStream) {
      deactivateCamera();
      // update the UI to show the camera is turned off (good if there are any delays)
      updateCameraUIOff();
    }
    if (audioStream) {
      deactivateAudio();
      // update the UI to show the audio is turned off (good if there are any delays)
      updateAudioUIOff();
    }
    window.location.href = "/incall";
  } else {
    alert("Could not begin call at this time.");
  }
}
