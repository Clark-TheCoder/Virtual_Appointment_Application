import { saveCallInformation } from "./submitForm.js";

const summaryInput = document.getElementById("call_summary");
const notesInput = document.getElementById("notes");
const planInput = document.getElementById("plan");
const popup = document.getElementById("popup");
const pageOverlay = document.getElementById("page_overlay");
const submitButton = document.getElementById("submit_button");
const continueButton = document.getElementById("continue_button");
const summaryTextArea = document.getElementById("summary_textarea");
const planTextArea = document.getElementById("plan_textarea");
const notesTextArea = document.getElementById("notes_textarea");
const visitStatusInputs = document.querySelectorAll(".visit_status_input");

export function getFormFunctionality(callData) {
  toggleHeaders();
  selectVisitStatus();
  loadVisitNotesToForm(callData.notes);
  cancelCharting();
  submitForm();
}

function toggleHeaders() {
  const inputSectionLabels = document.querySelectorAll(".section_label_div");
  inputSectionLabels.forEach((section) => {
    section.addEventListener("click", () => {
      const content = section.nextElementSibling;
      if (content && content.classList.contains("section_inputs_div")) {
        content.classList.toggle("flex");
      }
    });
  });
}

function selectVisitStatus() {
  visitStatusInputs.forEach((input) => {
    input.addEventListener("click", () => {
      let status = input.value;
      if (
        status === "no_show" ||
        status === "cancelled_by_patient" ||
        status === "cancelled_by_provider"
      ) {
        summaryInput.classList.replace("input_div", "hidden_input_div");
        notesInput.classList.replace("hidden_input_div", "input_div");
        planInput.classList.replace("hidden_input_div", "input_div");
      } else if (status === "completed") {
        summaryInput.classList.replace("hidden_input_div", "input_div");
        notesInput.classList.replace("hidden_input_div", "input_div");
        planInput.classList.replace("hidden_input_div", "input_div");
      }
      // When user selects a status, then they can submit the form
      validateForm();
    });
  });
}

function loadVisitNotesToForm(call_notes) {
  const { plan, notes, summary } = call_notes;
  planTextArea.value = plan || "";
  notesTextArea.value = notes || "";
  summaryTextArea.value = summary || "";
}

function cancelCharting() {
  document.getElementById("cancel_button").addEventListener("click", () => {
    summaryTextArea.value = "";
    planTextArea.value = "";
    notesTextArea.value = "";

    document.getElementById("undo_button").addEventListener("click", () => {
      popup.style.display = "none";
      pageOverlay.style.display = "none";
    });

    continueButton.addEventListener("click", () => {
      document.getElementById("visitSummary_form").requestSubmit();
      popup.style.display = "none";
      pageOverlay.style.display = "none";
    });
  });
}

export function validateForm() {
  submitButton.disabled = false;
  submitButton.classList.add("active_button");
  submitButton.classList.remove("inactive_button");
}

export function submitForm() {
  const form = document.getElementById("visitSummary_form");
  const submitButton = document.getElementById("submit_button");
  const popup = document.getElementById("popup");
  const pageOverlay = document.getElementById("page_overlay");
  const continueButton = document.getElementById("continue_button");
  const undoButton = document.getElementById("undo_button");

  // Show confirmation popup
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    popup.querySelector("h1").textContent =
      "Once you submit this form, you will not be able to edit this call's information again.";
    popup.style.display = "block";
    pageOverlay.style.display = "block";
  });

  // Undo button which closes the popup
  undoButton.addEventListener("click", () => {
    popup.style.display = "none";
    pageOverlay.style.display = "none";
  });

  // Continue button which confirms form submission
  continueButton.addEventListener("click", () => {
    popup.style.display = "none";
    pageOverlay.style.display = "none";
    form.requestSubmit();
  });

  // Actual form submission logic
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.querySelector(".visit_status_input:checked")?.value;
    let newNotes = {
      plan: planTextArea.value.trim(),
      notes: notesTextArea.value.trim(),
      summary: summaryTextArea.value.trim(),
    };
    let access_token = sessionStorage.getItem("access_token");
    await saveCallInformation(access_token, status, newNotes);
  });
}
