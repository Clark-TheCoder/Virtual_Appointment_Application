const sideBarButton = document.getElementById("notes_button");
const notes = document.getElementById("notes_container");

export function toggleSidebar() {
  sideBarButton.addEventListener("click", () => {
    notes.classList.toggle("hidden");
  });
}
