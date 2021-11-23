import newData from "./newData";
//import newData from "./getData";

const getMonths = (workingDays) => {
  const newArray = [];
  newData[0].forEach((obj) => {
    const startDateAndHour = new Date(obj["Start"]);
    const startMonthUTC = new Date(
      Date.UTC(
        startDateAndHour.getFullYear(),
        startDateAndHour.getMonth()
        // startDateAndHour.getDate()
      )
    );
    const startMonth = startMonthUTC.toLocaleDateString();
    const startDay = startDateAndHour.getDay();

    let startFullMonth =
      startDateAndHour.getFullYear() + "/" + startDateAndHour.getMonth();

    const endDateAndHour = new Date(obj["End\r"]);
    const endMonth = new Date(
      Date.UTC(
        endDateAndHour.getFullYear(),
        endDateAndHour.getMonth()
        // endDateAndHour.getDate()
      )
    );
    // const endDate = endDateUTC.toDateString();
    const endDay = endDateAndHour.getDay();
    let endFullMonth =
      endDateAndHour.getFullYear() + "/" + endDateAndHour.getMonth();

    if (workingDays.includes(startDay)) {
      if (newArray.length < 1) {
        newArray.push({
          label: startFullMonth,
          startCount: 1,
          endCount: 0
        });
      } else {
        const index = newArray.findIndex(
          ({ label }) => label === startFullMonth
        );
        if (index < 0) {
          newArray.push({
            label: startFullMonth,
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
          label: endFullMonth,
          startCount: 1,
          endCount: 0
        });
      } else {
        const index = newArray.findIndex(({ label }) => label === endFullMonth);
        if (index < 0) {
          newArray.push({
            label: endFullMonth,
            startCount: 1,
            endCount: 0
          });
        } else {
          newArray[index].endCount = newArray[index].endCount + 1;
        }
      }
    }
  });
  return newArray;
};

export default getMonths;
