const form = document.getElementById("form");
const csvFile = document.getElementById("csvFile");

function dataToArray(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  return arr;
}
const newData = [];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    newData.push(dataToArray(text));
    document.write(JSON.stringify(newData));
  };
  reader.readAsText(input);
});
export default newData;
