import {
  audioStream,
  deactivateAudio,
} from "../../../../media/audioController.js";
import {
  cameraStream,
  deactivateCamera,
} from "../../../../media/cameraController.js";

export function createJoinButton() {
  const joinButton = document.getElementById("join_call_button");
  joinButton.addEventListener("click", joinCall);
}

async function joinCall() {
  // api calls

  let callStarted = await startCall();

  if (callStarted) {
    if (cameraStream) {
      deactivateCamera();
    }
    if (audioStream) {
      deactivateAudio();
    }
  }
}
