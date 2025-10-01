const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit_button");

export function validateForm() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const isFilled = email && password;

  submitButton.disabled = !isFilled;
  submitButton.classList.toggle("active_button", isFilled);
  submitButton.classList.toggle("inactive_button", !isFilled);
}
