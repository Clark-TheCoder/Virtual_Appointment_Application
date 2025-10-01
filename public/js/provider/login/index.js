import { validateForm } from "./formValidator.js";
//import { handleLoginSubmit } from "./formSubmitHandler.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginForm = document.getElementById("login_form");

emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);

// loginForm.addEventListener("submit", handleLoginSubmit);
