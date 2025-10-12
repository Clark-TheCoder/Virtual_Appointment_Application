import { setCurrentCall } from "../../../currentCall.js";
import { showPreCallPopup } from "../../../precall/createPreCallPopup.js";

export function createJoinButton(call) {
  const joinButton = document.createElement("button");
  joinButton.classList.add("button");
  joinButton.textContent = "Join Call";
  joinButton.addEventListener("click", () => {
    setCurrentCall(call);
    showPreCallPopup();
  });
  return joinButton;
}
