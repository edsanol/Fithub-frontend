import { now, getLocalTimeZone } from "@internationalized/date";

export const useDateGMT5 = () => {
  const padZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);
  const day = padZero(now(getLocalTimeZone()).day);
  const month = padZero(now(getLocalTimeZone()).month);
  const year = now(getLocalTimeZone()).year;

  return `${year}-${month}-${day}`;
};
