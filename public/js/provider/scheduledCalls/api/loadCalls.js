import { createCallCard } from "../callCard/createCallCard.js";

const errorMessage = document.getElementById("error_message_div");
const errorMesageText = document.getElementById("error_message");
const scheduledCallsDiv = document.getElementById("calls");
scheduledCallsDiv.innerHTML = "";

export async function loadScheduledCalls() {
  try {
    const response = await fetch("/call/load_calls", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      const calls = data.calls;
      if (!calls || calls.length === 0) {
        errorMessage.style.display = "flex";
        errorMesageText.textContent = "No calls currently scheduled for today.";
      } else {
        data.calls.forEach((call) => {
          scheduledCallsDiv.appendChild(createCallCard(call));
        });
      }
    } else {
      errorMessage.style.display = "flex";
      errorMesageText.textContent =
        data.message ||
        "Error retrieving calls. Please log back in and try again.";
    }
  } catch (error) {
    errorMessage.style.display = "flex";
    errorMesageText.textContent = "Server error. Please try again later";
  }
}
