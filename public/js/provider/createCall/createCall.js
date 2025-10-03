const firstNameInput = document.getElementById("firstname");
const dayOfBirthInput = document.getElementById("dayOfBirth");
const emailInput = document.getElementById("email");
const errorMessage = document.getElementById("error_message_div");
const errorMessageText = document.getElementById("error_message");
const submitButton = document.getElementById("submit_button");
const popup = document.getElementById("popup");
const pageOverlay = document.getElementById("page_overlay");

export async function createCall(e) {
  e.preventDefault();

  const firstname = firstNameInput.value.toUpperCase().trim();
  const dayOfBirth = dayOfBirthInput.value.trim();
  const email = emailInput.value.trim();

  try {
    const response = await fetch("/call/create_link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ firstname, dayOfBirth, email }),
    });

    const data = await response.json();

    if (response.ok) {
      submitButton.disabled = true;

      popup.style.display = "block";
      popup.querySelector("h1").textContent = data.message;
      pageOverlay.style.display = "block";

      const closeButton = document.getElementById("close_button");
      closeButton.addEventListener("click", () => {
        popup.style.display = "none";
        pageOverlay.style.display = "none";

        firstNameInput.value = "";
        dayOfBirthInput.value = "";
        emailInput.value = "";
      });
    } else {
      errorMessage.style.display = "flex";
      errorMessageText.textContent = data.message || "Error. Please try again.";
    }
  } catch (error) {
    errorMessage.style.display = "flex";
    errorMessageText.textContent = "Server error. Please try again later";
  }
}
