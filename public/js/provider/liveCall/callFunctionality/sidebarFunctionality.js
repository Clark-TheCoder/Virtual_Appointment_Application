export function setupSidebarToggle() {
  const sideBarButton = document.getElementById("notes_button");
  const notes = document.getElementById("notes_container");

  sideBarButton.addEventListener("click", () => {
    notes.classList.toggle("hidden");
  });
}

// export function getSidebarNotes() {
//   const summaryTextArea = document.getElementById("summary_textarea");
//   const planTextArea = document.getElementById("plan_textarea");
//   const notesTextArea = document.getElementById("notes_textarea");
//   let summary = summaryTextArea.value.trim();
//   let plan = planTextArea.value.trim();
//   let notes = notesTextArea.value.trim();

//   if (!summary) summary = "No summary provided.";
//   if (!plan) plan = "No care plan provided.";
//   if (!notes) notes = "No additional notes provided.";
//   return { summary, plan, notes };
// }
