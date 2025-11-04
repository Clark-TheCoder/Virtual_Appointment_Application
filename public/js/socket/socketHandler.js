// import { activateCamera, cameraStream } from "../media/cameraController.js";
// import { activateAudio, audioStream } from "../media/audioController.js";
// import {
//   createPeerConnection,
//   getPeerConnection,
// } from "../webrtc/peerConnection.js";

// let socket;
// export let socketExists = false;

// let cameraTrack = null;
// let audioTrack = null;
// export let currentRoom = null;
// export let role = null;

// export function initSocket(roomId, userRole) {
//   role = userRole;

//   if (!socketExists) {
//     socket = io("/");

//     socket.on("user-joined", handleUserJoined);
//     socket.on("offer", handleOffer);
//     socket.on("answer", handleAnswer);
//     socket.on("ice-candidate", handleIceCandidate);
//     socket.on("user-left", handleUserLeft);

//     socketExists = true;
//   }

//   currentRoom = roomId;

//   // Create peer connection immediately
//   let pc = getPeerConnection();
//   if (!pc) pc = createPeerConnection(socket);

//   // Send who joined to server
//   socket.emit("join-call", { roomId, role });
//   return socket;
// }

// async function handleUserJoined({ role: remoteRole }) {
//   console.log("User joined:", remoteRole);

//   let pc = getPeerConnection();
//   if (!pc) pc = createPeerConnection(socket);

//   // Ensure media is ready
//   if (!cameraStream) await activateCamera();
//   if (!audioStream) await activateAudio();

//   cameraTrack = cameraStream.getVideoTracks()[0];
//   audioTrack = audioStream.getAudioTracks()[0];

//   if (cameraTrack && !pc.getSenders().some((s) => s.track === cameraTrack)) {
//     pc.addTrack(cameraTrack, cameraStream);
//     console.log("Added local camera track");
//   }

//   if (audioTrack && !pc.getSenders().some((s) => s.track === audioTrack)) {
//     pc.addTrack(audioTrack, audioStream);
//     console.log("Added local audio track");
//   }

//   // If pc has no remote description yet, send offer
//   if (!pc.currentRemoteDescription) {
//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);
//     socket.emit("offer", { roomId: currentRoom, sdp: pc.localDescription });
//     console.log("Offer sent to new peer");
//   }
// }

// async function handleOffer({ sdp }) {
//   let pc = getPeerConnection();
//   if (!pc) pc = createPeerConnection(socket);

//   await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//   console.log("Remote description set (offer)");

//   if (!cameraStream) await activateCamera();
//   if (!audioStream) await activateAudio();

//   cameraTrack = cameraStream.getVideoTracks()[0];
//   audioTrack = audioStream.getAudioTracks()[0];

//   if (cameraTrack && !pc.getSenders().some((s) => s.track === cameraTrack)) {
//     pc.addTrack(cameraTrack, cameraStream);
//   }

//   if (audioTrack && !pc.getSenders().some((s) => s.track === audioTrack)) {
//     pc.addTrack(audioTrack, audioStream);
//   }

//   const answer = await pc.createAnswer();
//   await pc.setLocalDescription(answer);

//   socket.emit("answer", { roomId: currentRoom, sdp: pc.localDescription });
//   console.log("Answer sent");
// }

// async function handleAnswer({ sdp }) {
//   const pc = getPeerConnection();
//   if (!pc) return;

//   await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//   console.log("Remote description set (answer)");
// }

// async function handleIceCandidate({ candidate }) {
//   const pc = getPeerConnection();
//   if (!pc) {
//     console.warn("No PeerConnection available yet");
//     return;
//   }

//   try {
//     await pc.addIceCandidate(candidate);
//     console.log("Added ICE candidate");
//   } catch (err) {
//     console.error("Error adding ICE candidate:", err);
//   }
// }

// async function handleUserLeft(role) {
//   console.log(`${role} left the call`);

//   const pc = getPeerConnection();
//   if (!pc) return;

//   // Stop and clear remote media only (keep connection open)
//   const remoteVideo = document.getElementById("remoteVideo");
//   const remotePlaceholder = document.getElementById("remotePlaceholder");

//   if (remoteVideo && remoteVideo.srcObject) {
//     const remoteStream = remoteVideo.srcObject;
//     remoteStream.getTracks().forEach((track) => track.stop());
//     remoteVideo.srcObject = null;

//     console.log("Cleared remote stream");
//   }

//   if (remotePlaceholder) {
//     remotePlaceholder.classList.remove("hidden");
//     remoteVideo.classList.add("hidden");
//   }

//   // Reset ICE/offer state safely, in case rejoin triggers new negotiation
//   if (
//     pc.signalingState === "have-local-offer" ||
//     pc.signalingState === "have-remote-offer"
//   ) {
//     try {
//       await pc.setLocalDescription({ type: "rollback" });
//       console.log("Rolled back offer state after disconnect");
//     } catch (err) {
//       console.warn("Rollback not supported:", err);
//     }
//   }

//   console.log("Peer connection preserved — ready for rejoin");
// }

import { activateCamera, cameraStream } from "../media/cameraController.js";
import { activateAudio, audioStream } from "../media/audioController.js";
import {
  createPeerConnection,
  getPeerConnection,
} from "../webrtc/peerConnection.js";

let socket;
export let socketExists = false;

let cameraTrack = null;
let audioTrack = null;
export let currentRoom = null;
export let role = null;

export function initSocket(roomId, userRole) {
  role = userRole;

  if (!socketExists) {
    socket = io("/");

    socket.on("user-joined", handleUserJoined);
    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("user-left", handleUserLeft);

    socketExists = true;
  }

  currentRoom = roomId;

  // Create peer connection immediately
  let pc = getPeerConnection();
  if (!pc) pc = createPeerConnection(socket);

  // Send who joined to server
  socket.emit("join-call", { roomId, role });
  return socket;
}

// ---------------------------------------------------------
// User joined or rejoined → send or resend an offer
// ---------------------------------------------------------
async function handleUserJoined({ role: remoteRole }) {
  console.log("User joined or rejoined:", remoteRole);

  let pc = getPeerConnection();
  if (!pc) pc = createPeerConnection(socket);

  // Ensure media is ready
  if (!cameraStream) await activateCamera();
  if (!audioStream) await activateAudio();

  cameraTrack = cameraStream.getVideoTracks()[0];
  audioTrack = audioStream.getAudioTracks()[0];

  if (remotePlaceholder && remoteVideo) {
    remotePlaceholder.classList.remove("hidden");
    remoteVideo.classList.add("hidden");
  }

  // Add local tracks if missing
  if (cameraTrack && !pc.getSenders().some((s) => s.track === cameraTrack)) {
    pc.addTrack(cameraTrack, cameraStream);
    console.log("Added local camera track");
  }

  if (audioTrack && !pc.getSenders().some((s) => s.track === audioTrack)) {
    pc.addTrack(audioTrack, audioStream);
    console.log("Added local audio track");
  }

  // Always send a fresh offer (handles reconnects too)
  try {
    const offer = await pc.createOffer({ iceRestart: true });
    await pc.setLocalDescription(offer);
    socket.emit("offer", {
      roomId: currentRoom,
      sdp: pc.localDescription,
      restart: true,
    });
    console.log("Offer sent or resent to peer (reconnect safe)");
  } catch (err) {
    console.error("Error creating or sending offer:", err);
  }
}

// ---------------------------------------------------------
// Handle incoming offer → respond with an answer
// ---------------------------------------------------------
async function handleOffer({ sdp, restart }) {
  console.log("Received offer" + (restart ? " (ICE restart)" : ""));

  let pc = getPeerConnection();
  if (!pc) pc = createPeerConnection(socket);

  await pc.setRemoteDescription(new RTCSessionDescription(sdp));
  console.log("Remote description set (offer)");

  if (!cameraStream) await activateCamera();
  if (!audioStream) await activateAudio();

  cameraTrack = cameraStream.getVideoTracks()[0];
  audioTrack = audioStream.getAudioTracks()[0];

  // Add local tracks if missing
  if (cameraTrack && !pc.getSenders().some((s) => s.track === cameraTrack)) {
    pc.addTrack(cameraTrack, cameraStream);
  }

  if (audioTrack && !pc.getSenders().some((s) => s.track === audioTrack)) {
    pc.addTrack(audioTrack, audioStream);
  }

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  socket.emit("answer", { roomId: currentRoom, sdp: pc.localDescription });
  console.log("Answer sent (reconnect safe)");
}

// ---------------------------------------------------------
// Handle answer
// ---------------------------------------------------------
async function handleAnswer({ sdp }) {
  const pc = getPeerConnection();
  if (!pc) return;

  try {
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    console.log("Remote description set (answer)");
  } catch (err) {
    console.error("Error setting remote answer:", err);
  }
}

// ---------------------------------------------------------
// Handle ICE candidate
// ---------------------------------------------------------
async function handleIceCandidate({ candidate }) {
  const pc = getPeerConnection();
  if (!pc) {
    console.warn("No PeerConnection available yet");
    return;
  }

  try {
    await pc.addIceCandidate(candidate);
    console.log("Added ICE candidate");
  } catch (err) {
    console.error("Error adding ICE candidate:", err);
  }
}

// ---------------------------------------------------------
// Handle user leaving (keeps connection open for reconnect)
// ---------------------------------------------------------
async function handleUserLeft(role) {
  console.log(`${role} left the call`);

  const pc = getPeerConnection();
  if (!pc) return;

  // Stop and clear remote media only (keep connection open)
  const remoteVideo = document.getElementById("remoteVideo");
  const remotePlaceholder = document.getElementById("remotePlaceholder");

  if (remoteVideo && remoteVideo.srcObject) {
    const remoteStream = remoteVideo.srcObject;
    remoteStream.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;

    console.log("Cleared remote stream");
  }

  if (remotePlaceholder && remoteVideo) {
    remotePlaceholder.classList.remove("hidden");
    remoteVideo.classList.add("hidden");
  }

  // Reset signaling state safely
  if (
    pc.signalingState === "have-local-offer" ||
    pc.signalingState === "have-remote-offer"
  ) {
    try {
      await pc.setLocalDescription({ type: "rollback" });
      console.log("Rolled back offer state after disconnect");
    } catch (err) {
      console.warn("Rollback not supported:", err);
    }
  }

  console.log("Peer connection preserved — ready for rejoin");
}
