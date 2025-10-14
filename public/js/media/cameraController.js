let cameraStream = null;
let cameraTrack = null;

// Returns whether a camera stream exists
export function getCamera() {
  if (cameraStream) {
    return true;
  } else {
    return false;
  }
}

// Create a new camera stream
export async function activateCamera() {
  if (!cameraStream) {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraTrack = cameraStream.getVideoTracks()[0];
      cameraTrack.enabled = false; // start disabled
      console.log("Starting new camera stream...");
    } catch (err) {
      cameraStream = null;
      cameraTrack = null;
    }
  }
  return cameraStream;
}

// Remove camera streams and tracks
export function deactivateCamera() {
  if (cameraTrack) {
    cameraTrack.stop();
    cameraTrack = null;
  }
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }
  sessionStorage.setItem("cameraSetting", false);
}

// Toggle camera tracks on/off and set sessionStorage according to the track's status
export function toggleCamera() {
  if (!cameraStream || !cameraTrack) {
    activateCamera().then(() => toggleCamera());
    return;
  }

  cameraTrack.enabled = !cameraTrack.enabled;
  sessionStorage.setItem("cameraSetting", cameraTrack.enabled);
  console.log(cameraTrack);
  return cameraTrack.enabled;
}

export { cameraStream };
