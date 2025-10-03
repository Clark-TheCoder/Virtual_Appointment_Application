export function createJoinButton(call) {
  const joinButton = document.createElement("button");
  joinButton.classList.add("button");
  joinButton.textContent = "Join Call";
  joinButton.addEventListener("click", () => {
    console.log("join");
  });
  return joinButton;
}
