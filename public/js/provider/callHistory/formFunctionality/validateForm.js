export function setupInputValidation() {
  const yearInput = document.getElementById("year_input");
  const monthInput = document.getElementById("month_input");
  const dayInput = document.getElementById("day_input");
  const aliasInput = document.getElementById("patientAlias_input");
  const statusInput = document.getElementById("status_input");
  const submitButton = document.getElementById("submit_button");

  yearInput.addEventListener("input", validateForm);
  monthInput.addEventListener("input", validateForm);
  dayInput.addEventListener("input", validateForm);
  aliasInput.addEventListener("input", validateForm);
  statusInput.addEventListener("input", validateForm);

  function validateDate() {
    const year = yearInput.value.trim();
    const month = monthInput.value.trim();
    const day = dayInput.value.trim();
    const isValidYear = /^\d{4}$/.test(year);
    if (year && !isValidYear) return false;
    if (isValidYear && !month && !day) return false;
    if (day && !month && !isValidYear) return false;
    if (day && month && !isValidYear) return false;
    if (isValidYear && month && !day) return true;
    if (isValidYear && month && day) return true;
    return false;
  }

  function validateAlias() {
    const alias = aliasInput.value.trim();
    const match = alias.match(/^([A-Za-z]{2})(\\d{1,2})$/);
    if (match) {
      const numberPart = parseInt(match[2], 10);
      return numberPart >= 1 && numberPart <= 31;
    }
    return false;
  }

  function validateStatus() {
    const status = statusInput.value;
    return (
      status === "completed" ||
      status === "no_show" ||
      status === "cancelled_by_provider" ||
      status === "cancelled_by_patient"
    );
  }

  function validateForm() {
    const validAlias = validateAlias();
    const validStatus = validateStatus();
    const validDate = validateDate();

    const conditionOne = validDate && validAlias && validStatus;
    const conditionTwo = validAlias && validStatus;
    const conditionThree = validDate;

    const isValid = conditionOne || conditionTwo || conditionThree;
    submitButton.disabled = !isValid;

    submitButton.classList.toggle("inactive_button", !isValid);
    submitButton.classList.toggle("active_button", isValid);
  }
}
