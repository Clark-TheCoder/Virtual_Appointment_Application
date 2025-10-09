import { formatCallStatus } from "./formateCallCardByStatus.js";

export function renderCalls(calls, callsContainer) {
  calls.forEach((call) => {
    const callContainer = document.createElement("div");
    callContainer.classList.add("call");

    const callCover = document.createElement("div");
    callCover.classList.add("call_cover");
    callContainer.appendChild(callCover);

    const topOfCover = document.createElement("div");
    topOfCover.classList.add("top_info_container");
    callCover.appendChild(topOfCover);

    const patientAlias = document.createElement("h1");
    patientAlias.textContent = call.patient_alias;
    const date = document.createElement("h4");
    date.textContent = call.date_created.split("T")[0];
    topOfCover.appendChild(patientAlias);
    topOfCover.appendChild(date);

    const bottomOfCover = document.createElement("div");
    bottomOfCover.classList.add("bottom_info_container");
    callCover.appendChild(bottomOfCover);

    const bottomInfoContainer = document.createElement("div");
    bottomInfoContainer.classList.add("info_container");
    const status = document.createElement("h3");

    status.textContent = formatCallStatus(call.status);
    const duration = document.createElement("h4");
    duration.textContent = call.duration_minutes + " mins" || "00:00:00 mins";
    bottomInfoContainer.appendChild(status);
    bottomInfoContainer.appendChild(duration);

    const button = document.createElement("button");
    const img = document.createElement("img");
    img.id = "menu_icon";
    img.src = "/media/provider/general/angle-down.png";
    img.alt = ">";
    img.width = 30;
    img.height = 30;
    button.appendChild(img);
    bottomOfCover.appendChild(bottomInfoContainer);
    bottomOfCover.appendChild(button);

    const callNotesContainer = document.createElement("div");
    callNotesContainer.classList.add("call_notes", "content", "hidden");
    callContainer.appendChild(callNotesContainer);

    button.addEventListener("click", () => {
      callNotesContainer.classList.toggle("hidden");
    });

    const addSection = (title, text) => {
      const section = document.createElement("div");
      const sectionTitle = document.createElement("h3");
      sectionTitle.textContent = title;
      const sectionText = document.createElement("p");
      sectionText.textContent = text;
      section.appendChild(sectionTitle);
      section.appendChild(sectionText);
      callNotesContainer.appendChild(section);
    };

    addSection("Call Summary", call.call_notes.summary);
    addSection("Plan", call.call_notes.plan);
    addSection("Additional Notes", call.call_notes.notes);

    callsContainer.appendChild(callContainer);
  });
}
