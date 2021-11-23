function drawBarChart(data, startColor, endColor) {
  const canvas = document.getElementById("my-canvas");
  const context = canvas.getContext("2d");
  data.sort((a, b) => a.label - b.label);
  var barWidth = 5;
  var minValue = 0;
  var maxValue = 0;
  data.forEach((obj) => {
    if (obj.startCount > maxValue) {
      maxValue = obj.startCount;
    }
    if (obj.endCount > maxValue) {
      maxValue = obj.endCount;
    }
  });

  var gridLineIncrement = 1;

  var font = "7pt Calibri";
  var axisColor = "#555";
  var padding = 2;

  var range = maxValue - minValue;
  var numGridLines = Math.round(range / gridLineIncrement);
  var longestValueWidth = getLongestValueWidth();
  var x = padding + longestValueWidth + 4 * padding;
  var y = padding * 2;
  var width = canvas.width - (longestValueWidth + padding * 2);
  var height = canvas.height - (getLabelAreaHeight() + padding * 4);

  drawYAxis();
  drawXAxis();
  drawYValues();
  drawXLabels();
  drawBars();

  function getLongestValueWidth() {
    var longestValueWidth = 0;
    for (var n = 0; n <= numGridLines; n++) {
      var value = maxValue - n * gridLineIncrement;
      longestValueWidth = Math.max(
        longestValueWidth,
        context.measureText(value).width
      );
    }
    return longestValueWidth;
  }
  function getLabelAreaHeight() {
    var maxLabelWidth = 0;
    for (var n = 0; n < data.length; n++) {
      var label = data[n].label;
      maxLabelWidth = Math.max(maxLabelWidth, context.measureText(label).width);
    }
    return Math.round(maxLabelWidth / Math.sqrt(2));
  }
  function drawXAxis() {
    context.save();
    context.beginPath();
    context.moveTo(x, y + height);
    context.lineTo(x + width, y + height);
    context.strokeStyle = axisColor;
    context.lineWidth = 1;
    context.stroke();
    context.restore();
  }
  function drawYAxis() {
    context.save();
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, height + y);
    context.strokeStyle = axisColor;
    context.lineWidth = 1;
    context.stroke();
    context.restore();
  }

  function drawXLabels() {
    context.save();
    var barSpacing = 20;
    for (var i = 0; i < data.length; i++) {
      var label = data[i].label;
      context.save();
      context.translate(x + (i + 1 / 2) * barSpacing, y + height + 10);
      context.rotate((-1 * Math.PI) / 4); // rotate 45 degrees
      context.font = font;
      context.fillStyle = "black";
      context.textAlign = "right";
      context.textBaseline = "middle";
      context.font = "7px Arial";
      context.fillText(label, 0, 0);
      context.restore();
    }
    context.restore();
  }
  function drawYValues() {
    context.save();
    context.font = font;
    context.fillStyle = "black";
    context.textAlign = "right";
    context.textBaseline = "middle";
    for (var n = 0; n <= numGridLines; n++) {
      var value = maxValue - n * gridLineIncrement;
      var thisY = (n * height) / numGridLines + y;
      context.fillText(value, x - 5, thisY);
    }
    context.restore();
  }

  function drawBars() {
    context.save();
    var barSpacing = 20;
    var unitHeight = canvas.height / range;

    for (var n = 0; n < data.length; n++) {
      var barHeightStart = data[n].startCount * unitHeight;
      var barHeightEnd = data[n].endCount * unitHeight;

      context.save();
      context.translate(
        Math.round(x + (n + 1 / 2) * barSpacing),
        Math.round(y + height)
      );
      context.scale(1, -1);
      context.beginPath();
      context.rect(-barWidth / 2, 0, barWidth, barHeightStart);
      context.fillStyle = startColor;
      context.fill();
      context.restore();

      context.save();
      context.translate(
        Math.round(x + (n + 1.5 / 2) * barSpacing),
        Math.round(y + height)
      );
      context.scale(1, -1);
      context.beginPath();
      context.rect(-barWidth / 2, 0, barWidth, barHeightEnd);
      context.fillStyle = endColor;
      context.fill();
      context.restore();
    }
    context.restore();
  }
}
export default drawBarChart;
