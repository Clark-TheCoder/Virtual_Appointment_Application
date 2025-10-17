import { deactivateAudio } from "../../../../media/audioController.js";
import { deactivateCamera } from "../../../../media/cameraController.js";
import { endCallTime } from "../../api/endCallTime.js";
import { updateCall } from "../../api/updateCall.js";
import { getCurrentCall, setCurrentCall } from "../../currentCall.js";

const endCallButton = document.getElementById("end_call_button");
const popup = document.getElementById("popup");
const pageOverlay = document.getElementById("page_overlay");

export async function createEndCallButton() {
  endCallButton.addEventListener("click", async () => {
    getEndCallPopup();
  });
}

export async function getEndCallPopup() {
  popup.style.display = "block";
  pageOverlay.style.display = "flex";

  const returnButton = document
    .getElementById("return_button")
    .addEventListener("click", returnToCall);
  const endAndChartButton = document
    .getElementById("endAndChart_button")
    .addEventListener("click", endAndChart);
  const endNoChartButton = document
    .getElementById("endNoChart_button")
    .addEventListener("click", endNoChart);
}

function returnToCall() {
  popup.style.display = "none";
  pageOverlay.style.display = "none";
}

async function endAndChart() {
  let callUpdated = await updateCall("completed_not_charted");
  let endTimeSet = await endCallTime(sessionStorage.getItem("access_token"));

  if (callUpdated && endTimeSet) {
    getCurrentCall.status = "completed_not_charted";
    deactivateAudio();
    deactivateCamera();
    window.location.href = "/call/visit_summary";
  }
}

async function endNoChart() {
  let callUpdated = await updateCall("completed_not_charted");
  let endTimeSet = await endCallTime(sessionStorage.getItem("access_token"));

  if (callUpdated && endTimeSet) {
    getCurrentCall.status = "completed_not_charted";
    deactivateAudio();
    deactivateCamera();
    sessionStorage.removeItem("access_token");
    window.location.href = "/call/scheduled_calls";
  }
}
