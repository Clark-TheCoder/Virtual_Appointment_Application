export function formatCallStatus(callStatus) {
  switch (callStatus) {
    case "completed":
      return "Completed";
    case "no_show":
      return "No Show";
    case "cancelled_by_patient":
      return "Cancelled By Patient";
    case "cancelled_by_provider":
      return "Cancelled By Provider";
    default:
      return "Unknown Status";
  }
}
