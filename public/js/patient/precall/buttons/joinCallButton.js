import { initSocket } from "../../../socket/socketHandler.js";
import { showCallUI } from "../../ui/incallUI.js";
import { hidePreCallPopup } from "../../ui/precallUI.js";

export function createJoinButton() {
  const joinButton = document.getElementById("join_call_button");
  joinButton.addEventListener("click", joinCall);
}

async function joinCall() {
  hidePreCallPopup();
  showCallUI();

  const access_token = window.location.pathname.split("/").pop();
  initSocket(access_token, "patient");
}
