import { deactivateAudio } from "../../../media/audioController.js";
import { deactivateCamera } from "../../../media/cameraController.js";

const endCallButton = document.getElementById("end_call_button");

export async function createEndCallButton() {
  endCallButton.addEventListener("click", async () => {
    deactivateAudio();
    deactivateCamera();
  });
}
