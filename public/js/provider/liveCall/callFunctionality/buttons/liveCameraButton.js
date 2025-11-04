import {
  activateCamera,
  getCamera,
  toggleCamera,
  cameraStream,
} from "../../../../media/cameraController.js";

const cameraButton = document.getElementById("incall_camera_button");
const cameraBtnImg = document.getElementById("incall_camera_image");
const localVideo = document.getElementById("localVideo");
const localVideoPlaceholder = document.querySelector(".localVideo");

export function createCameraButton() {
  cameraButton.addEventListener("click", toggleCameraButton);
}

export async function toggleCameraButton() {
  if (!getCamera()) {
    const stream = await activateCamera();
    toggleCamera();
    showCameraStream(stream);
    updateCameraUIOn();
  } else {
    const trackStatus = toggleCamera();
    if (trackStatus) {
      showCameraStream(cameraStream);
      updateCameraUIOn();
    } else {
      updateCameraUIOff();
    }
  }
}

export function showCameraStream(stream) {
  const activeStream = stream || cameraStream;
  if (!activeStream) {
    alert("Cannot access camera at this time.");
    return;
  }

  localVideo.srcObject = activeStream;
  localVideo.onloadedmetadata = () => localVideo.play();

  localVideo.classList.remove("hidden");
  localVideoPlaceholder.classList.add("hidden");
}

export function updateCameraUIOn() {
  cameraBtnImg.src = "/media/provider/videoIcons/camera_on.png";
  localVideoPlaceholder.classList.add("hidden");
  localVideo.classList.remove("hidden");
}

export function updateCameraUIOff() {
  cameraBtnImg.src = "/media/provider/videoIcons/camera_off.png";
  localVideo.classList.add("hidden");
  localVideoPlaceholder.classList.remove("hidden");
}
