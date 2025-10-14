import { getAudio } from "../../../media/audioController.js";
import {
  activateCamera,
  getCamera,
  toggleCamera,
} from "../../../media/cameraController.js";

export function setupCallControls() {
  const cameraButton = document.getElementById("incall_camera_button");
  const audioButton = document.getElementById("incall_audio_button");
  const endCallButton = document.getElementById("end_call_button");

  if (cameraButton) {
    cameraButton.addEventListener("click", async () => {
      if (!getCamera()) {
        await activateCamera();
        toggleCamera();
        //showCameraStream(localVideo);
        updateCameraUIOn();
      } else {
        const trackStatus = toggleCamera();
        if (trackStatus === true) {
          updateCameraUIOn();
        } else {
          updateCameraUIOff();
        }
      }
    });
  }
  if (audioButton) {
    audioButton.addEventListener("click", async () => {
      let isAudioStream = getAudio();
      if (isAudioStream) {
        console.log("existing audio");
      } else {
        console.log("not existing audio");
      }
    });
  }

  if (endCallButton) {
    endCallButton.addEventListener("click", async () => {
      console.log("call end call popup function");
    });
  }
}

// export function updateAudioUIOn() {
//   const audioBtnImg = document.getElementById("incall_volume_image");
//   audioBtnImg.src = "/media/provider/videoIcons/volume_on.png";
// }

// export function updateAudioUIOf() {
//   const audioBtnImg = document.getElementById("incall_volume_image");
//   audioBtnImg.src = "/media/provider/videoIcons/volume_off.png";
// }

// export function updateCameraUIOn() {
//   const cameraBtnImg = document.getElementById("incall_camera_image");
//   cameraBtnImg.src = "/media/provider/videoIcons/camera_on.png";
// }

// export function updateCameraUIOff() {
//   const cameraBtnImg = document.getElementById("incall_camera_image");
//   cameraBtnImg.src = "/media/provider/videoIcons/camera_off.png";
// }

export function cameraOff() {}
