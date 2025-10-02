import { createCall } from "./createCall.js";
import { validateForm } from "./validateForm.js";

document.addEventListener("DOMContentLoaded", () => {
  const firstNameInput = document.getElementById("firstname");
  const dayOfBirthInput = document.getElementById("dayOfBirth");
  const emailInput = document.getElementById("email");
  const createLinkForm = document.getElementById("createLink_form");

  // Add input listeners for validation
  [firstNameInput, dayOfBirthInput, emailInput].forEach((input) => {
    input.addEventListener("input", validateForm);
  });

  // Add form submit listener
  createLinkForm.addEventListener("submit", createCall);
});
