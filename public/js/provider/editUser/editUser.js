const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const positionInput = document.getElementById("position");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const errorMessage = document.getElementById("error_message_div");
const errorMesageText = document.getElementById("error_message");
const popup = document.getElementById("popup");
const pageOverlay = document.getElementById("page_overlay");

export async function handleEditUserSubmit(e) {
  e.preventDefault();

  const firstname = firstnameInput.value.trim();
  const lastname = lastnameInput.value.trim();
  const position = positionInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const body = {};
  if (firstname) body.firstname = firstname;
  if (lastname) body.lastname = lastname;
  if (email) body.email = email;
  if (position) body.position = position;
  if (password) body.password = password;

  try {
    const response = await fetch("/user/edit_user_details", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    let data = await response.json();

    if (response.ok) {
      popup.style.display = "block";
      popup.querySelector("h1").textContent = data.message;
      pageOverlay.style.display = "block";
    } else {
      errorMessage.style.display = "flex";
      errorMesageText.textContent =
        data.message || "An unexpected error occurred. Please try again.";
    }
    console.log(data);
  } catch (error) {
    console.error("Could not get to backend");
    alert(
      "We’re having trouble reaching the service. Please refresh the page or try again later."
    );
  }
}
