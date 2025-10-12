import {
  audioStream,
  deactivateAudio,
} from "../../../../media/audioController.js";
import {
  cameraStream,
  deactivateCamera,
} from "../../../../media/cameraController.js";

export function createCancelButton() {
  const cancelButton = document.getElementById("cancel_call_button");
  cancelButton.addEventListener("click", cancelJoiningCall);
}

function cancelJoiningCall() {
  const preCallPopup = document.getElementById("pc_popup");
  const preCallOverlay = document.getElementById("pc_page_overlay");
  preCallPopup.style.display = "none";
  preCallOverlay.style.display = "none";

  if (cameraStream) {
    deactivateCamera();
  }
  if (audioStream) {
    deactivateAudio();
  }
}
