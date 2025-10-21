import {
  activateAudio,
  audioStream,
  getAudio,
  toggleAudio,
} from "../../../media/audioController.js";

const audioButton = document.getElementById("incall_audio_button");
const audioBtnImg = document.getElementById("incall_volume_image");
const localAudio = document.getElementById("localAudio");

export function createAudioButton() {
  audioButton.addEventListener("click", toggleAudioButton);
}

export async function toggleAudioButton() {
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
  localAudio.muted = true; // mute when the user is in the call
  localAudio.style.display = "block";
}

export async function syncAudioButton() {
  updateAudioUIOn();
  showAudioStream(audioStream);
}

export function updateAudioUIOn() {
  audioBtnImg.src = "/media/provider/videoIcons/volume_on.png";
}

export function updateAudioUIOff() {
  audioBtnImg.src = "/media/provider/videoIcons/volume_off.png";
}
