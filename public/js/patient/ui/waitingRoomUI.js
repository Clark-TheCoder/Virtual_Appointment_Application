const pageOverlay = document.getElementById("page_overlay");
const popup = document.getElementById("popup");

export function showWaitingRoom() {
  pageOverlay.style.display = "block";
  popup.style.display = "block";
}

export function hideWaitingRoom() {
  pageOverlay.style.display = "none";
  popup.style.display = "none";
}
