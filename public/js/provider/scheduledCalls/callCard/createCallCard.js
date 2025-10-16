import { createCancelButton } from "./buttons/createCancelButton.js";
import { createChartButton } from "./buttons/createChartButton.js";
import { createJoinButton } from "./buttons/createJoinButton.js";

export function createCallCard(call) {
  const callDiv = document.createElement("div");
  callDiv.classList.add("call");

  const callLabel = document.createElement("h1");
  callLabel.textContent = call.patient_alias;
  callDiv.appendChild(callLabel);

  const callStatus = document.createElement("h3");
  callStatus.classList.add("call_status");
  callDiv.appendChild(callStatus);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("call_buttons_div");

  if (call.status === "generated") {
    callStatus.textContent = "Scheduled";
    callDiv.style.backgroundColor = "#00a9a7";
    buttonDiv.appendChild(createJoinButton(call));
    buttonDiv.appendChild(createChartButton(call));
    buttonDiv.appendChild(createCancelButton(call));
  } else if (call.status === "in_progress") {
    callStatus.textContent = "In Progress";
    callDiv.style.backgroundColor = "#046b6a";
    buttonDiv.appendChild(createJoinButton(call));
  } else if (call.status === "completed_not_charted") {
    callStatus.textContent = "Completed-Not Charted";
    callDiv.style.backgroundColor = "#a4a4a4";
    buttonDiv.appendChild(createChartButton(call));
  }

  callDiv.appendChild(buttonDiv);
  return callDiv;
}
