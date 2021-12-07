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
const logFileText = async (file) => {
  const response = await fetch(file);
  const text = await response.text();
  return text;
};
const newData = [];
logFileText("card_data_v2.csv")
  .then((data) => dataToArray(data))
  .then((data) => {
    newData.push(...data);
    return newData;
  });
export default newData;
