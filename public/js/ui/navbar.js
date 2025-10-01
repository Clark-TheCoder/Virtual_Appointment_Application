fetch("/html/navbar.html")
  .then((res) => res.text())
  .then(async (data) => {
    document.getElementById("nav-placeholder").innerHTML = data;

    // Add eventlistener to sign out user
    // const { signout } = await import("../utils/api/signout.js");
    // const signoutBtn = document.getElementById("logout");
    // signoutBtn.addEventListener("click", async () => {
    //   const { createErrorMessage } = await import(
    //     "../../../utils/ui/createErrorMessage.js"
    //   );
    //   let signedOut = await signout();
    //   if (signedOut) {
    //     window.location = "/";
    //   } else if (!signedOut) {
    //     document.body.appendChild(
    //       createErrorMessage(
    //         "We’re having trouble reaching the service. Please refresh the page or try again later."
    //       )
    //     );
    //   }
    // });

    const menuIcon = document.getElementById("menu_icon");
    const navigationContainer = document.getElementById("navigation_container");
    menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("show_menu");
      navigationContainer.classList.toggle("show_nav");
    });

    navigationContainer.addEventListener("mouseleave", () => {
      menuIcon.classList.toggle("show_menu");
      navigationContainer.classList.toggle("show_nav");
    });
  })
  .catch((error) => {
    console.error("Error loading the nav:", error);
  });
