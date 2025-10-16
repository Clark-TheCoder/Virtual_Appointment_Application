import { getCurrentCall } from "../currentCall.js";

export async function startCall() {
  try {
    const response = await fetch("/call/doctor/startCall", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ access_token: getCurrentCall.access_token }),
    });

    const data = await response.json();
    if (!response.ok) {
      return false;
    }

    return data;
  } catch (error) {
    return false;
  }
}
