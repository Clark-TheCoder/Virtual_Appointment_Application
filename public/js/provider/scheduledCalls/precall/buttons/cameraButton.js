import {
  activateCamera,
  getCamera,
  toggleCamera,
  cameraStream,
} from "../../../../media/cameraController.js";

const cameraButton = document.getElementById("camera_button");
const cameraImg = document.getElementById("camera_image");
const localVideo = document.getElementById("video_preview");
const cameraPlaceholder = document.getElementById("camera_icon");

export function createCameraButton() {
  const cameraButton = document.getElementById("camera_button");
  updateCameraUIOff();
  cameraButton.addEventListener("click", toggleCameraButton);
}

async function toggleCameraButton() {
  if (!getCamera()) {
    const stream = await activateCamera();
    toggleCamera();
    showCameraStream(stream);
    updateCameraUIOn();
  } else {
    const trackStatus = toggleCamera();
    if (trackStatus === true) {
      updateCameraUIOn();
    } else {
      updateCameraUIOff();
    }
  }
}

function showCameraStream(stream) {
  const activeStream = stream || cameraStream;
  if (!activeStream) {
    alert("Cannot access camera at this time.");
    return;
  }
  localVideo.srcObject = activeStream;
  localVideo.onloadedmetadata = () => {
    localVideo.play();
  };
  localVideo.style.display = "block";
}

// Update UI when camera is ON
function updateCameraUIOn() {
  cameraImg.src = "/media/provider/videoIcons/camera_on.png";
  cameraPlaceholder.style.display = "none";
  cameraButton.classList.add("selected");
  localVideo.style.display = "block";
}

// Update UI when camera is OFF
export function updateCameraUIOff() {
  cameraImg.src = "/media/provider/videoIcons/camera_off.png";
  cameraPlaceholder.style.display = "flex";
  cameraButton.classList.remove("selected");
  localVideo.style.display = "none";
}
