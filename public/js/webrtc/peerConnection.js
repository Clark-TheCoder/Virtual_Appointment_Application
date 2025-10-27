import { currentRoom } from "../socket/socketHandler.js";

let pc;

export function createPeerConnection(socket) {
  pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("Emitting ICE candidate:", event.candidate);
      socket.emit("ice-candidate", {
        roomId: currentRoom,
        candidate: event.candidate,
      });
    }
  };

  pc.ontrack = (event) => {
    const remoteStream = event.streams[0];
    console.log("Got remote track", remoteStream);

    // Separate audio tracks
    const audioTracks = remoteStream.getAudioTracks();
    if (audioTracks.length > 0) {
      const remoteAudio = document.getElementById("remoteAudio");
      if (remoteAudio.srcObject !== remoteStream) {
        remoteAudio.srcObject = remoteStream;
        remoteAudio.play().catch((err) => {
          console.warn("Remote audio play failed:", err);
        });
      }
    }

    // Separate video tracks
    const videoTracks = remoteStream.getVideoTracks();
    if (videoTracks.length > 0) {
      const videoEl = document.getElementById("remoteVideo");
      if (videoEl.srcObject !== remoteStream) {
        videoEl.srcObject = remoteStream;
        videoEl.play().catch((err) => {
          console.warn("Remote video play failed:", err);
        });
      }
    }
  };

  console.log("PeerConnection created");
  return pc;
}

export function getPeerConnection() {
  return pc;
}
