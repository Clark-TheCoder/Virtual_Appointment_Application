import { createAudioButton } from "./buttons/audioButton.js";
import { createCameraButton } from "./buttons/cameraButton.js";
import { createCancelButton } from "./buttons/cancelCallButton.js";
import { createJoinButton } from "./buttons/joinCallButton.js";

const preCallPopup = document.getElementById("pc_popup");
const preCallOverlay = document.getElementById("pc_page_overlay");

// Show pre-call popup
export function showPreCallPopup() {
  preCallPopup.style.display = "flex";
  const callLabel = preCallPopup.querySelector("#pc_popup h2");
  callLabel.innerHTML = "Would you like to join this call?";
  preCallOverlay.style.display = "block";
  // Setup camera/audio toggles using shared state

  createCameraButton();
  createAudioButton();
  createCancelButton();
  createJoinButton();

  // Replace the old event listener with a fresh one to avoid multiple bindings
  //   const joinCallButton = document.getElementById("join_call_button");
  //   const newJoinCallButton = joinCallButton.cloneNode(true);
  //   joinCallButton.parentNode.replaceChild(newJoinCallButton, joinCallButton);
  //   newJoinCallButton.classList.add("enabledButton");
  //   newJoinCallButton.classList.remove("disabledButton");
  //   newJoinCallButton.disabled = false;

  //newJoinCallButton.addEventListener("click", () =>
  // joinCall(call, localVideoObj, localAudioObj)
  //   );
}
