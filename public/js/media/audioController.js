let audioStream = null;
let audioTrack = null;

// Returns whether an audio stream exists
export function getAudio() {
  if (audioStream) {
    return true;
  } else {
    return false;
  }
}

// Create a new audio stream
export async function activateAudio() {
  if (!audioStream) {
    try {
      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioTrack = audioStream.getAudioTracks()[0];
      audioTrack.enabled = false; // start muted
    } catch (err) {
      console.error("Error activating microphone:", err);
      audioStream = null;
      audioTrack = null;
    }
  }
  return audioStream;
}

// Remove audio streams and tracks
export function deactivateAudio() {
  if (audioTrack) {
    audioTrack.stop();
    audioTrack = null;
  }
  if (audioStream) {
    audioStream.getTracks().forEach((track) => track.stop());
    audioStream = null;
  }
  sessionStorage.setItem("audioSetting", false);
}

// Toggle audio tracks on/off and set sessionStorage according to the track's status
export function toggleAudio() {
  if (!audioStream || !audioTrack) {
    activateAudio().then(() => toggleAudio());
    return;
  }

  audioTrack.enabled = !audioTrack.enabled;
  sessionStorage.setItem("audioSetting", audioTrack.enabled);
  return audioTrack.enabled;
}

export { audioStream };
