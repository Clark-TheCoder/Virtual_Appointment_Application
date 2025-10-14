import { createAudioButton } from "./audioButton.js";
import { createCameraButton } from "./cameraButton.js";
import { createCancelButton } from "./cancelCallButton.js";
import { createJoinButton } from "./joinCallButton.js";

export function initButtons() {
  createAudioButton();
  createCameraButton();
  createCancelButton();
  createJoinButton();
}
