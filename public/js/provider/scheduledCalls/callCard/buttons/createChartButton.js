export function createChartButton(call) {
  const chartButton = document.createElement("button");
  chartButton.classList.add("button");
  chartButton.textContent = "Chart";
  chartButton.addEventListener("click", () => {
    if (!call.access_token) {
      alert("Unable to access this call. Please reload page.");
    } else {
      sessionStorage.setItem("access_token", call.access_token);
      window.location.href = "/call/visit_summary";
    }
  });
  return chartButton;
}
