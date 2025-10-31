// import { currentRoom } from "../socket/socketHandler.js";

// let pc;

// export function createPeerConnection(socket) {
//   pc = new RTCPeerConnection({
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   });

//   pc.onicecandidate = (event) => {
//     if (event.candidate) {
//       console.log("Emitting ICE candidate:", event.candidate);
//       socket.emit("ice-candidate", {
//         roomId: currentRoom,
//         candidate: event.candidate,
//       });
//     }
//   };

//   pc.ontrack = (event) => {
//     const remoteStream = event.streams[0];

//     const videoTracks = remoteStream.getVideoTracks();
//     const audioTracks = remoteStream.getAudioTracks();

//     const videoEl = document.getElementById("remoteVideo");
//     const audioEl = document.getElementById("remoteAudio");

//     if (event.track.kind === "video") {
//       videoEl.srcObject = event.streams[0];
//     } else if (event.track.kind === "audio") {
//       audioEl.srcObject = event.streams[0];
//     }

//     // Log actual element state
//     console.log("Video element paused:", videoEl.paused);
//     console.log("Video element readyState:", videoEl.readyState); // 0 = HAVE_NOTHING, 4 = HAVE_ENOUGH_DATA
//     console.log("Audio element paused:", audioEl.paused);
//     console.log("Audio element readyState:", audioEl.readyState);

//     // Log whether autoplay restrictions might block playback
//     console.log("Video autoplay allowed?", !videoEl.paused);
//     console.log("Audio autoplay allowed?", !audioEl.paused);

//     console.log("Video element muted?", videoEl.muted);
//     console.log("Audio element muted?", audioEl.muted);
//     console.log("Attempting to play...");
//     videoEl.muted = false; // just to test
//     audioEl.muted = false; // just to test
//     videoEl.play().catch((err) => console.warn("Video play error:", err));
//     audioEl.play().catch((err) => console.warn("Audio play error:", err));

//     // Log track enabled and muted status
//     videoTracks.forEach((t, i) =>
//       console.log(`Video track ${i} - enabled: ${t.enabled}, muted: ${t.muted}`)
//     );
//     audioTracks.forEach((t, i) =>
//       console.log(`Audio track ${i} - enabled: ${t.enabled}, muted: ${t.muted}`)
//     );
//   };

//   console.log("PeerConnection created");
//   return pc;
// }

// export function getPeerConnection() {
//   return pc;
// }

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
    console.log("Remote track received:", event.track.kind);

    const remoteStream = event.streams[0];
    const videoEl = document.getElementById("remoteVideo");
    const audioEl = document.getElementById("remoteAudio");

    if (event.track.kind === "video" && videoEl) {
      videoEl.srcObject = remoteStream;
      videoEl.classList.remove("hidden");
      videoEl.muted = false; // unmute for remote
      videoEl
        .play()
        .catch((err) => console.warn("Video play error:", err.message));
    }

    if (event.track.kind === "audio" && audioEl) {
      audioEl.srcObject = remoteStream;
      audioEl.muted = false;
      audioEl
        .play()
        .catch((err) => console.warn("Audio play error:", err.message));
    }
  };

  console.log("PeerConnection created");
  return pc;
}

export function getPeerConnection() {
  return pc;
}
