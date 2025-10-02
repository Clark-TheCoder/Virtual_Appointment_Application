import { login } from "./login.js";
import { validateForm } from "./validateForm.js";

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  emailInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);
  const loginForm = document.getElementById("login_form");
  loginForm.addEventListener("submit", login);
});
