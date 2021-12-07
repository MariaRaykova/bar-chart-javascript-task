const getDays = (workingDays, newData) => {
  const newArray = [];

  newData.forEach((obj) => {
    const startDateAndHour = new Date(obj["Start Date"]);
    const startDateUTC = new Date(
      Date.UTC(
        startDateAndHour.getFullYear(),
        startDateAndHour.getMonth(),
        startDateAndHour.getDate()
      )
    );
    const startFullDate = startDateUTC.toDateString();
    const startDay = startDateAndHour.getDay();
    let startDate =
      startDateAndHour.getFullYear() +
      "/" +
      startDateAndHour.getMonth() +
      "/" +
      startDateAndHour.getDate();

    const endDateAndHour = new Date(obj["End Date\r"]);
    const endDateUTC = new Date(
      Date.UTC(
        endDateAndHour.getFullYear(),
        endDateAndHour.getMonth(),
        endDateAndHour.getDate()
      )
    );
    const endFullDate = endDateUTC.toDateString();
    const endDay = endDateAndHour.getDay();
    let endDate =
      endDateAndHour.getFullYear() +
      "/" +
      endDateAndHour.getMonth() +
      "/" +
      endDateAndHour.getDate();

    if (workingDays.includes(startDay)) {
      if (newArray.length < 1) {
        newArray.push({
          label: startFullDate,
          date: startDate,
          startCount: 1,
          endCount: 0
        });
      } else {
        const index = newArray.findIndex(({ date }) => date === startDate);
        if (index < 0) {
          newArray.push({
            label: startFullDate,
            date: startDate,
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
          label: endFullDate,
          date: endDate,
          startCount: 0,
          endCount: 1
        });
      } else {
        const index = newArray.findIndex(({ date }) => date === endDate);
        if (index < 0) {
          newArray.push({
            label: endFullDate,
            date: endDate,
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

export default getDays;
