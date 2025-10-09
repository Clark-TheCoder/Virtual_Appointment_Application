import { setupInputValidation } from "./formFunctionality/validateForm.js";
import { handleSearchSubmit } from "./getHistoricalCalls.js";

document.addEventListener("DOMContentLoaded", () => {
  setupInputValidation();
  handleSearchSubmit();
});
