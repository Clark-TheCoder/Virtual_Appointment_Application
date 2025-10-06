import { getCallData } from "../../api/fetchCallData.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log(sessionStorage.getItem("access_token"));
  await getCallData(sessionStorage.getItem("access_token"));
});
