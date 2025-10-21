export async function getCallStatus() {
  const url = window.location.pathname;
  const access_token = url.split("/").pop();

  try {
    const response = await fetch(`/call/join/status/${access_token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    if (response.ok) {
      return data.status;
    } else {
      return data.success;
    }
  } catch (error) {
    return alert("Cannot get call at this time.");
  }
}
