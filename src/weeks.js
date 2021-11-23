import newData from "./newData";
//import newData from "./getData";
const getWeeks = (workingDays) => {
  const newArray = [];
  newData[0].forEach((obj) => {
    const startDateAndHour = new Date(obj["Start"]);
    const startDateUTC = new Date(
      Date.UTC(
        startDateAndHour.getFullYear(),
        startDateAndHour.getMonth(),
        startDateAndHour.getDate()
      )
    );

    const startDay = startDateAndHour.getDay();
    let onejanStart = new Date(startDateUTC.getFullYear(), 0, 1);
    let startWeek = Math.ceil(
      ((startDateUTC.getTime() - onejanStart.getTime()) / 86400000 +
        onejanStart.getDay() +
        1) /
        7
    );
    let startFullWeek = "Week " + startWeek + " " + startDateUTC.getFullYear();

    const endDateAndHour = new Date(obj["End\r"]);
    const endDateUTC = new Date(
      Date.UTC(
        endDateAndHour.getFullYear(),
        endDateAndHour.getMonth(),
        endDateAndHour.getDate()
      )
    );

    const endDay = endDateAndHour.getDay();

    let onejanEnd = new Date(endDateUTC.getFullYear(), 0, 1);
    let endWeek = Math.ceil(
      ((endDateUTC.getTime() - onejanEnd.getTime()) / 86400000 +
        onejanEnd.getDay() +
        1) /
        7
    );
    let endFullWeek = "Week " + endWeek + " " + endDateUTC.getFullYear();

    if (workingDays.includes(startDay)) {
      if (newArray.length < 1) {
        newArray.push({
          week: startWeek,
          label: startFullWeek,
          startCount: 1,
          endCount: 0
        });
      } else {
        const index = newArray.findIndex(({ week }) => week === startWeek);
        if (index < 0) {
          newArray.push({
            week: startWeek,
            label: startFullWeek,
            startCount: 1,
            endCount: 0
          });
        } else {
          newArray[index].startCount = newArray[index].startCount + 1;
        }
      }
    }
    if (workingDays.includes(endDay)) {
      if (newArray.length < 1) {
        newArray.push({
          week: endWeek,
          label: endFullWeek,
          startCount: 1,
          endCount: 0
        });
      } else {
        const index = newArray.findIndex(({ week }) => week === endWeek);
        if (index < 0) {
          newArray.push({
            week: endWeek,
            label: endFullWeek,
            start: 1,
            end: 0
          });
        } else {
          newArray[index].endCount = newArray[index].endCount + 1;
        }
      }
    }
  });
  return newArray;
};

export default getWeeks;
