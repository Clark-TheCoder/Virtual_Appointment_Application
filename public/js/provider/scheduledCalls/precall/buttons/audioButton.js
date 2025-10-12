import {
  activateAudio,
  getAudio,
  toggleAudio,
  audioStream,
} from "../../../../media/audioController.js";

const audioButton = document.getElementById("audio_button");
const audioImg = document.getElementById("audio_image");
const localAudio = document.getElementById("localAudio");

export function createAudioButton() {
  updateAudioUIOff();
  audioButton.addEventListener("click", toggleAudioButton);
}

async function toggleAudioButton() {
  if (!getAudio()) {
    await activateAudio();
    toggleAudio();
    showAudioStream();
    updateAudioUIOn();
  } else {
    const trackStatus = toggleAudio();
    if (trackStatus === true) {
      showAudioStream();
      updateAudioUIOn();
    } else {
      updateAudioUIOff();
    }
  }
}

// Attach audio stream to the <audio> element and play it
function showAudioStream() {
  if (audioStream) {
    localAudio.srcObject = audioStream;
    localAudio.onloadedmetadata = () => localAudio.play();
    localAudio.volume = 0.3;
    localAudio.style.display = "block";
  }
}

// Update UI when audio is ON
function updateAudioUIOn() {
  audioImg.src = "/media/provider/videoIcons/volume_on.png";
  audioButton.classList.add("selected");
  localAudio.style.display = "block";
}

// Update UI when audio is OFF
function updateAudioUIOff() {
  audioImg.src = "/media/provider/videoIcons/volume_off.png";
  audioButton.classList.remove("selected");
  localAudio.style.display = "none";
}
