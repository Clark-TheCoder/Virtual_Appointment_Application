import { startCall } from "../../api/startCall.js";
import { getCurrentCall } from "../../currentCall.js";

export function createJoinButton() {
  const joinButton = document.getElementById("join_call_button");
  joinButton.addEventListener("click", joinCall);
}

async function joinCall() {
  let callInfo = getCurrentCall;

  // If the call is already in progress, just join the call
  if (callInfo.status === "in_progress") {
    window.location.href = "/call/provider/liveCall";
  }

  // If this is the first join, start the call
  if (callInfo.status === "generated") {
    // Start the call
    let isCallStarted = await startCall();
    if (isCallStarted) {
      window.location.href = "/call/provider/liveCall";
    } else {
      alert("Could not begin call at this time.");
    }
  }
}
