const pageOverlay = document.getElementById("page_overlay");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup_message");

export function showEndCall() {
  pageOverlay.style.display = "block";
  popup.style.display = "block";
  popupMessage.innerHTML =
    "Call ended or is unavailable. Please contact the clinic if you believe this is a mistake.";
}

export function hideEndCall() {
  pageOverlay.style.display = "none";
  popup.style.display = "none";
}
