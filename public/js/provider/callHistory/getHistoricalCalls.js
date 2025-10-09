import { renderCalls } from "./formFunctionality/renderCalls.js";

export function handleSearchSubmit() {
  const searchForm = document.getElementById("search_form");
  const callsContainer = document.getElementById("calls");
  const errorMessage = document.getElementById("error_message_div");
  const errorMessageText = document.getElementById("error_message");

  const yearInput = document.getElementById("year_input");
  const monthInput = document.getElementById("month_input");
  const dayInput = document.getElementById("day_input");
  const aliasInput = document.getElementById("patientAlias_input");
  const statusInput = document.getElementById("status_input");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    callsContainer.innerHTML = "";

    const searchData = {};
    if (yearInput.value.trim()) searchData.year = yearInput.value.trim();
    if (monthInput.value.trim())
      searchData.month = Number(monthInput.value.trim());
    if (dayInput.value.trim()) searchData.day = Number(dayInput.value.trim());
    if (aliasInput.value.trim()) searchData.alias = aliasInput.value.trim();
    if (statusInput.value.trim()) searchData.status = statusInput.value.trim();

    try {
      const response = await fetch("/call/call_history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(searchData),
      });

      const data = await response.json();

      if (response.ok && data.calls && data.calls.length > 0) {
        renderCalls(data.calls, callsContainer);
        errorMessage.style.display = "none";
      } else {
        errorMessage.style.display = "flex";
        errorMessageText.textContent =
          data.message || "Could not find calls matching this criteria.";
      }
    } catch {
      errorMessage.style.display = "flex";
      errorMessageText.textContent = "Server Error. Please try again later";
    }
  });
}
