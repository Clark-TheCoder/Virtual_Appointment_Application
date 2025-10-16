export async function getCallData(access_token) {
  try {
    let response = await fetch("/call/visit_summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ access_token }),
    });

    const data = await response.json();
    if (response.ok) {
      let call = {
        status: data.callData.status,
        notes: data.callData.call_notes,
      };
      return call;
    } else {
      alert("Cannot get call notes at this time.");
    }
  } catch (error) {
    alert("Unable to get call notes due to server error.");
  }
}
