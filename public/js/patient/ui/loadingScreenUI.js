export function showLoadingScreen() {
  const spinner = document.getElementById("loading_spinner");
  if (spinner) {
    spinner.style.display = "flex";
  }
}

export function hideLoadingScreen() {
  const spinner = document.getElementById("loading_spinner");
  if (spinner) {
    spinner.style.display = "none";
  }
}
