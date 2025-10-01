const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const positionInput = document.getElementById("position");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");
const submitBtn = document.getElementById("submit_button");

export function validateForm() {
  const firstname = firstnameInput.value.trim();
  const lastname = lastnameInput.value.trim();
  const position = positionInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    confirmPassword === password;

  // Visual feedback
  if (passwordsMatch) {
    passwordInput.style.border = "3px solid green";
    confirmPasswordInput.style.border = "3px solid green";
  } else {
    passwordInput.style.border = "none";
    confirmPasswordInput.style.border = "none";
  }

  const allFilled =
    firstname && lastname && position && email && password && passwordsMatch;

  submitBtn.disabled = !allFilled;
  submitBtn.classList.toggle("active_button", allFilled);
  submitBtn.classList.toggle("inactive_button", !allFilled);
}
