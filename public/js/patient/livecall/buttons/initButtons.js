import { createEndCallButton } from "./endCallButton.js";
import { createAudioButton } from "./liveAudioButton.js";
import { createCameraButton } from "./liveCameraButton.js";

export function initButtons() {
  createCameraButton();
  createAudioButton();
  createEndCallButton();
}
