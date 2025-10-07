export async function saveCallInformation(access_token, status, newNotes) {
  if (!status || !newNotes) {
    alert("Invalid form values.");
    return;
  }
  if (!access_token) {
    alert("Cannot access this call. Please reload and try again later.");
    return;
  }

  try {
    const response = await fetch("/call/save_visit_summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ access_token, status, newNotes }),
    });

    if (!response.ok) {
      alert("Could not submit call data at this time. Please try again later.");
      window.location.reload();
    } else {
      window.location.reload();
    }
  } catch (error) {
    alert("Server error. Please try again later.");
  }
}
