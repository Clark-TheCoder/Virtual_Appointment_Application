const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit_button");
const errorMessage = document.getElementById("error_message_div");
const errorMessageText = document.getElementById("error_message");

export async function login(e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = "/user/home";
    } else {
      errorMessage.style.display = "flex";
      errorMessageText.textContent =
        data.message || "Login failure. Please try again.";
    }
  } catch (error) {
    errorMessage.style.display = "flex";
    errorMessageText.textContent = "Server error. Please try again later";
  }
}
