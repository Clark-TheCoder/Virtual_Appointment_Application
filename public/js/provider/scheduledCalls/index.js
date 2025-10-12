import { loadScheduledCalls } from "./api/loadCalls.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadScheduledCalls();
});
