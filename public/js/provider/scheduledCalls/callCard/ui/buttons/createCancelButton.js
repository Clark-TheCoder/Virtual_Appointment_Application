import { deleteCall } from "../../api/deleteCall.js";

export function createCancelButton(call) {
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("button");
  cancelButton.textContent = "Mark as Unneeded";

  cancelButton.addEventListener("click", async (e) => {
    const deletedCall = await deleteCall(call);

    if (deletedCall) {
      const callElement = e.target.closest(".call");
      callElement?.remove();
    } else {
      alert("Unable to delete the call at this moment.");
    }
  });

  return cancelButton;
}
