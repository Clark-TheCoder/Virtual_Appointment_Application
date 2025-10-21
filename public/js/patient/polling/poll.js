import { getCallStatus } from "../api/getCallStatus.js";
//import { getPatientStatus, setCurrentStatus } from "../patientStatus.js";
import { showPreCallPopup } from "../ui/precallUI.js";
import { hideWaitingRoom, showWaitingRoom } from "../ui/waitingRoomUI.js";
import { hideEndCall, showEndCall } from "../ui/endcallUI.js";
import { hideLoadingScreen } from "../ui/loadingScreenUI.js";

let lastCallStatus = null;

export async function startPolling() {
  setInterval(async () => {
    let callStatus = await getCallStatus();

    // Only update UI if the status has changed
    if (callStatus === lastCallStatus) return;
    lastCallStatus = callStatus;

    //setCurrentStatus(callStatus);
    console.log("Call status:", callStatus);

    hideLoadingScreen();

    if (
      !callStatus ||
      callStatus === "completed_not_charted" ||
      callStatus === "completed"
    ) {
      showEndCall();
    } else if (callStatus === "generated") {
      showWaitingRoom();
    } else if (callStatus === "in_progress") {
      hideWaitingRoom();
      showPreCallPopup();
    }
  }, 4000);
}
