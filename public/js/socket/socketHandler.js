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
// export function initSocket(roomId) {
//   if (!socketExists) {
//     socket = io("/");

//     socket.on("user-joined", handleUserJoined);
//     socket.on("offer", handleOffer);
//     socket.on("answer", handleAnswer);
//     socket.on("ice-candidate", handleIceCandidate);

//     socketExists = true;

//     socket.emit("join-call", { roomId });
//     currentRoom = roomId;
//   } else if (socketExists) {
//     socket.emit("join-call", roomId);
//     currentRoom = roomId;
//   }
//   return socket;
// }

// async function handleUserJoined() {
//   console.log("handleUserJoined triggered");

//   // Create peerconnection if not already created
//   let pc = getPeerConnection();
//   if (!pc) {
//     pc = createPeerConnection(socket);
//   }

//   if (!cameraStream) {
//     console.error("No camera stream available");
//     return;
//   }

//   if (!audioStream) {
//     console.error("No audio stream available");
//     return;
//   }

//   cameraTrack = cameraStream.getVideoTracks()[0];
//   audioTrack = audioStream.getAudioTracks()[0];

//   console.log(audioTrack);
//   console.log(cameraTrack);

//   if (
//     cameraTrack &&
//     !pc.getSenders().some((sender) => sender.track === cameraTrack)
//   ) {
//     pc.addTrack(cameraTrack, cameraStream);
//     console.log("adding local camera track to pc");
//   }
//   if (
//     audioTrack &&
//     !pc.getSenders().some((sender) => sender.track === audioTrack)
//   ) {
//     pc.addTrack(audioTrack, audioStream);
//     console.log("adding local audio track to pc");
//   }

//   const offer = await pc.createOffer();
//   await pc.setLocalDescription(offer);
//   socket.emit("offer", { roomId: currentRoom, sdp: pc.localDescription });
//   console.log("Offer sent:", offer.sdp);
// }

// async function handleOffer({ sdp }) {
//   console.log("Handle offer:", sdp);

//   let pc = getPeerConnection();
//   if (!pc) {
//     pc = createPeerConnection(socket);
//   }

//   await pc.setRemoteDescription({ type: "offer", sdp });
//   console.log("Remote decription set");

//   // Add tracks if not already added
//   if (cameraTrack && !pc.getSenders().some((s) => s.track === cameraTrack)) {
//     pc.addTrack(cameraTrack, cameraStream);
//   }
//   if (audioTrack && !pc.getSenders().some((s) => s.track === audioTrack)) {
//     pc.addTrack(audioTrack, audioStream);
//   }

//   const answer = await pc.createAnswer();
//   await pc.setLocalDescription(answer);

//   socket.emit("answer", { roomId: currentRoom, sdp: pc.localDescription });
//   console.log("Sent answer:", answer.sdp);
// }

// async function handleAnswer({ sdp }) {
//   console.log("Handle answer:", sdp);

//   const pc = getPeerConnection();
//   if (!pc) return;

//   await pc.setRemoteDescription(new RTCSessionDescription(sdp));

//   console.log("Setting remote description. Type: answer");
// }

// async function handleIceCandidate({ candidate }) {
//   console.log("Received ICE candidate:", candidate);
//   const pc = getPeerConnection();
//   if (!pc) {
//     console.warn("No PeerConnection available yet");
//     return;
//   }
//   try {
//     await pc.addIceCandidate(candidate);
//     console.log("Successfully added ICE candidate");
//   } catch (err) {
//     console.error("Error adding ICE candidate:", err);
//   }
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
let isInitiator = false; // 👈 Track whether this user is the initiator

export function initSocket(roomId, initiator = false) {
  if (!socketExists) {
    socket = io("/");

    socket.on("user-joined", handleUserJoined);
    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidate);

    socketExists = true;
  }

  // Store room and initiator state
  currentRoom = roomId;
  isInitiator = initiator;

  // ✅ Send both roomId and initiator info to the server
  socket.emit("join-call", { roomId, initiator });
  return socket;
}

async function handleUserJoined({ initiator }) {
  console.log("handleUserJoined triggered | Remote initiator:", initiator);

  // 🧠 Only the initiator creates and sends the offer
  if (!isInitiator) return;

  let pc = getPeerConnection();
  if (!pc) pc = createPeerConnection(socket);

  // Ensure media is ready before creating the offer
  if (!cameraStream) await activateCamera();
  if (!audioStream) await activateAudio();

  cameraTrack = cameraStream.getVideoTracks()[0];
  audioTrack = audioStream.getAudioTracks()[0];

  if (cameraTrack && !pc.getSenders().some((s) => s.track === cameraTrack)) {
    pc.addTrack(cameraTrack, cameraStream);
    console.log("Added local camera track");
  }

  if (audioTrack && !pc.getSenders().some((s) => s.track === audioTrack)) {
    pc.addTrack(audioTrack, audioStream);
    console.log("Added local audio track");
  }

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  socket.emit("offer", { roomId: currentRoom, sdp: pc.localDescription });
  console.log("Offer sent:", offer);
}

async function handleOffer({ sdp }) {
  console.log("Handle offer:", sdp);

  let pc = getPeerConnection();
  if (!pc) pc = createPeerConnection(socket);

  await pc.setRemoteDescription(new RTCSessionDescription(sdp));
  console.log("Remote description set (offer)");

  // Ensure media is ready before answering
  if (!cameraStream) await activateCamera();
  if (!audioStream) await activateAudio();

  cameraTrack = cameraStream.getVideoTracks()[0];
  audioTrack = audioStream.getAudioTracks()[0];

  if (cameraTrack && !pc.getSenders().some((s) => s.track === cameraTrack)) {
    pc.addTrack(cameraTrack, cameraStream);
  }

  if (audioTrack && !pc.getSenders().some((s) => s.track === audioTrack)) {
    pc.addTrack(audioTrack, audioStream);
  }

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  socket.emit("answer", { roomId: currentRoom, sdp: pc.localDescription });
  console.log("Answer sent:", answer);
}

async function handleAnswer({ sdp }) {
  console.log("Handle answer:", sdp);

  const pc = getPeerConnection();
  if (!pc) return;

  await pc.setRemoteDescription(new RTCSessionDescription(sdp));
  console.log("Remote description set (answer)");
}

async function handleIceCandidate({ candidate }) {
  console.log("Received ICE candidate:", candidate);

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
