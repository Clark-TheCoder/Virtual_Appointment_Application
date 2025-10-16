export async function endCallTime(access_token) {
  try {
    let response = await fetch("/call/end_call_time", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ access_token }),
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
