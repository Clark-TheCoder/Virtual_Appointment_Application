const firstNameInput = document.getElementById("firstname");
const dayOfBirthInput = document.getElementById("dayOfBirth");
const emailInput = document.getElementById("email");
const submitButton = document.getElementById("submit_button");

// Conditions that make each fields valid
const isNameValid = (name) => /^[a-zA-Z\s'-]+$/.test(name);
const isDayValid = (day) =>
  /^\d+$/.test(day) && Number(day) >= 1 && Number(day) <= 31;
const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function validateForm() {
  const firstName = firstNameInput.value.trim();
  const dayOfBirth = dayOfBirthInput.value.trim();
  const email = emailInput.value.trim();

  // Validate each field
  const nameValid = isNameValid(firstName);
  const dayValid = isDayValid(dayOfBirth);
  const emailValid = isEmailValid(email);

  // Border styling for valid/invalid fields
  firstNameInput.style.border =
    firstName === "" || nameValid ? "" : "3px solid rgb(196, 36, 36)";
  dayOfBirthInput.style.border = dayValid ? "" : "3px solid rgb(196, 36, 36)";
  emailInput.style.border = emailValid ? "" : "3px solid rgb(196, 36, 36)";

  // Form is valid only if all fields are valid
  const formIsValid = nameValid && dayValid && emailValid;

  submitButton.disabled = !formIsValid;
  submitButton.classList.toggle("active_button", formIsValid);
  submitButton.classList.toggle("inactive_button", !formIsValid);
}
