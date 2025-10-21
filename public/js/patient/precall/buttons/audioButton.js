import {
  activateAudio,
  getAudio,
  toggleAudio,
  audioStream,
} from "../../../media/audioController.js";

const audioButton = document.getElementById("audio_button");
const audioImg = document.getElementById("audio_image");
const localAudio = document.getElementById("localAudio");

export function createAudioButton() {
  updateAudioUIOff();
  audioButton.addEventListener("click", toggleAudioButton);
}

async function toggleAudioButton() {
  console.log("toggle");
  if (!getAudio()) {
    let stream = await activateAudio();
    toggleAudio();
    showAudioStream(stream);
    updateAudioUIOn();
  } else {
    const trackStatus = toggleAudio();
    if (trackStatus === true) {
      updateAudioUIOn();
    } else {
      updateAudioUIOff();
    }
  }
}

function showAudioStream(stream) {
  let activeStream = (localAudio.srcObject = stream || audioStream);
  if (!activeStream) {
    alert("Cannot access your microphone at this time.");
    return;
  }
  localAudio.onloadedmetadata = () => localAudio.play();
  localAudio.volume = 0.3;
  localAudio.style.display = "block";
}

// Update UI when audio is ON
export function updateAudioUIOn() {
  audioImg.src = "/media/provider/videoIcons/volume_on.png";
  audioButton.classList.add("selected");
}

// Update UI when audio is OFF
export function updateAudioUIOff() {
  audioImg.src = "/media/provider/videoIcons/volume_off.png";
  audioButton.classList.remove("selected");
}
