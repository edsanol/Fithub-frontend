import { now, getLocalTimeZone } from "@internationalized/date";

export const useDateGMT5 = () => {
  const day = now(getLocalTimeZone()).day;
  const month = now(getLocalTimeZone()).month;
  const year = now(getLocalTimeZone()).year;

  return `${year}-${month}-${day}`;
};
