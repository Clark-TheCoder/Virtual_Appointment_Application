export function createChartButton(call) {
  const chartButton = document.createElement("button");
  chartButton.classList.add("button");
  chartButton.textContent = "Chart";
  chartButton.addEventListener("click", () => {
    console.log("Chart");
  });
  return chartButton;
}
