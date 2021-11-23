import "./styles.css";
import getDays from "./days";
import getWeeks from "./weeks";
import getMonths from "./months";
import drawBarChart from "./draw";
var startColor = "red";
var endColor = "green";
var data = [];
var startDay = 1;
var endDay = 5;
var workingDays = [];
calculateWorkingDays();
data = getDays(workingDays);
drawBarChart(data, startColor, endColor);

const intervalSelect = document.getElementById("select_interval");
intervalSelect.addEventListener(`change`, (e) => {
  const select = e.target;
  const value = select.options[select.selectedIndex].value;
  if (value === "day") {
    clearChart();
    // calculateWorkingDays();
    data = getDays(workingDays);
    drawBarChart(data, startColor, endColor);
  } else if (value === "week") {
    clearChart();
    // calculateWorkingDays();
    data = getWeeks(workingDays);
    drawBarChart(data, startColor, endColor);
  } else if (value === "month") {
    clearChart();

    data = getMonths(workingDays);
    drawBarChart(data, startColor, endColor, workingDays);
  }
});
const colorSelectStart = document.getElementById("color_id_start");
colorSelectStart.addEventListener(`change`, (e) => {
  const select = e.target;
  startColor = select.options[select.selectedIndex].value;
  clearChart();
  drawBarChart(data, startColor, endColor);
});
const colorSelectEnd = document.getElementById("color_id_end");
colorSelectEnd.addEventListener(`change`, (e) => {
  const select = e.target;
  endColor = select.options[select.selectedIndex].value;
  clearChart();
  drawBarChart(data, startColor, endColor);
});
const workingDaysSelectStart = document.getElementById("day_start");
workingDaysSelectStart.addEventListener(`change`, (e) => {
  const select = e.target;
  startDay = select.options[select.selectedIndex].value;
  clearChart();
  calculateWorkingDays();
  data = getDays(workingDays);
  drawBarChart(data, startColor, endColor);
});
const workingDaysSelectEnd = document.getElementById("day_end");
workingDaysSelectEnd.addEventListener(`change`, (e) => {
  const select = e.target;
  endDay = select.options[select.selectedIndex].value;
  clearChart();
  calculateWorkingDays();
  data = getDays(workingDays);
  drawBarChart(data, startColor, endColor);
});

function clearChart() {
  var parent = document.getElementById("canvas-container");
  var child = document.getElementById("my-canvas");
  parent.removeChild(child);
  parent.innerHTML =
    '   <canvas id="my-canvas" height="500" width="900"> </canvas>';
  return;
}
function calculateWorkingDays() {
  workingDays = [];
  var current = startDay - 1;
  for (var i = startDay; i <= endDay; i++) {
    current++;

    if (current > 6) {
      current = 0;
    }
    workingDays.push(current);
  }
  return workingDays;
}
