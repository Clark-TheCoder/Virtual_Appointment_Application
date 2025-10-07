import { getCallData } from "../../api/fetchCallData.js";
import { getFormFunctionality } from "./formFunctionality/formFunctionality.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Get data
  let access_token = sessionStorage.getItem("access_token");
  let callData = await getCallData(access_token);

  //Load data into the form
  getFormFunctionality(callData);
});

// If the page is reloaded, send the user back to the main page
window.addEventListener("load", () => {
  const [navigation] = performance.getEntriesByType("navigation");
  if (navigation.type === "reload") {
    sessionStorage.removeItem("access_token");
    window.location.href = "/call/scheduled_calls";
  }
});
