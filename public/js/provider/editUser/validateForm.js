const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const positionInput = document.getElementById("position");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");
const submitButton = document.getElementById("submit_button");

export function validateValues() {
  const firstname = firstnameInput.value.trim();
  const lastname = lastnameInput.value.trim();
  const position = positionInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  const anyInputFilled = firstname || lastname || position || email || password;
  const passwordsMatch = password && password === confirmPassword;

  if (!anyInputFilled) {
    disableSubmit();
    return;
  }

  if (password) {
    if (passwordsMatch) {
      enableSubmit();
    } else {
      disableSubmit();
    }
  } else {
    enableSubmit(); // allow updates without password
  }
}

function enableSubmit() {
  submitButton.disabled = false;
  submitButton.classList.remove("inactive_button");
  submitButton.classList.add("active_button");
}

function disableSubmit() {
  submitButton.disabled = true;
  submitButton.classList.remove("active_button");
  submitButton.classList.add("inactive_button");
}
