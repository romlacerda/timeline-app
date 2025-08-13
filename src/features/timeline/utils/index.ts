import dayjs from "dayjs";

export const getDatesInRange = (startDate: string, endDate: string) => {
    const dates = [];
    let currentDate = dayjs(startDate);
    const endDay = dayjs(endDate);
  
    while (currentDate.isSameOrBefore(endDay, "day")) {
      dates.push(currentDate.format("MM/DD/YYYY"));
      currentDate = currentDate.add(1, "day");
    }

    return dates;
  };