import { getCallSummary } from "./api/getCallSummary.js";

document.addEventListener("DOMContentLoaded", async () => {
  await getCallSummary(sessionStorage.getItem("access_token"));
});

// window.addEventListener("beforeunload", () => {
//   sessionStorage.removeItem("access_token");
// });
