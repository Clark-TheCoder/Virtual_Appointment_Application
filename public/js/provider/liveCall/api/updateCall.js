const summaryTextArea = document.getElementById("summary_textarea");
const planTextArea = document.getElementById("plan_textarea");
const notesTextArea = document.getElementById("notes_textarea");

export async function updateCall(status) {
  const access_token = sessionStorage.getItem("access_token");

  let newNotes = {
    plan: planTextArea.value.trim(),
    notes: notesTextArea.value.trim(),
    summary: summaryTextArea.value.trim(),
  };

  if (!status || !newNotes) {
    alert("Invalid form values.");
    return false;
  }
  if (!access_token) {
    alert("Cannot access this call. Please reload and try again later.");
    return false;
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

    let data = await response.json();
    if (response.ok) {
      console.log(data);
      return data.success;
    } else {
      alert("Cannot save call notes/status at this time.");
      return false;
    }
  } catch (error) {
    alert("Cannot save call notes/status at this time.");
    return false;
  }
}
