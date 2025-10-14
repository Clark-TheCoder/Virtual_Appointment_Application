import { initButtons } from "./buttons/initButtons.js";

const preCallPopup = document.getElementById("pc_popup");
const preCallOverlay = document.getElementById("pc_page_overlay");

// Show pre-call popup
export function showPreCallPopup() {
  preCallPopup.style.display = "flex";
  const callLabel = preCallPopup.querySelector("#pc_popup h2");
  callLabel.innerHTML = "Would you like to join this call?";
  preCallOverlay.style.display = "block";
  // Setup camera/audio toggles using shared state

  initButtons();
}
