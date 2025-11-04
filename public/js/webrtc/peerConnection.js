import { currentRoom } from "../socket/socketHandler.js";

let pc;

export function createPeerConnection(socket) {
  pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        roomId: currentRoom,
        candidate: event.candidate,
      });
    }
  };

  pc.ontrack = (event) => {
    const remoteStream = event.streams[0];

    const videoEl = document.getElementById("remoteVideo");
    const audioEl = document.getElementById("remoteAudio");

    if (event.track.kind === "video" && videoEl) {
      videoEl.srcObject = remoteStream;
      videoEl.classList.remove("hidden");
      videoEl.muted = false;
      videoEl.play().catch((err) => console.warn("Video play error:", err));
    }

    if (event.track.kind === "audio" && audioEl) {
      audioEl.srcObject = remoteStream;
      audioEl.muted = false;
      audioEl.play().catch((err) => console.warn("Audio play error:", err));
    }
  };

  console.log("PeerConnection created");
  return pc;
}

export function getPeerConnection() {
  return pc;
}
