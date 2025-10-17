import { getCallData } from "../../../../api/fetchCallData.js";

const summaryTextArea = document.getElementById("summary_textarea");
const planTextArea = document.getElementById("plan_textarea");
const notesTextArea = document.getElementById("notes_textarea");

// Get the call notes from the backend and display them in the textareas
export async function getNotes() {
  let callData = await getCallData(sessionStorage.getItem("access_token"));
  if (!callData) {
    summaryTextArea.innerHTML = "Summary of discussion with patient...";
    planTextArea.innerHTML =
      "Care plan details, prescriptions, consultations...";
    notesTextArea.innerHTML = "Enter notes here...";
    return;
  }
  summaryTextArea.innerHTML = callData.notes.summary;
  planTextArea.innerHTML = callData.notes.plan;
  notesTextArea.innerHTML = callData.notes.notes;
}
