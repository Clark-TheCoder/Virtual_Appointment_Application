import { validateForm } from "./validateForm.js";
import { signup } from "./signup.js";

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", validateForm);
  });

  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    select.addEventListener("change", validateForm);
  });

  const signupForm = document.getElementById("signup_form");
  signupForm.addEventListener("submit", signup);
});
