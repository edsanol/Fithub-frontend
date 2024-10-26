export const useDateGMT5 = () => {
  const today = new Date();
  const gmt5Offset = -5 * 60;
  const localTime = today.getTime();
  const localOffset = today.getTimezoneOffset() * 60000;
  const gmt5Time = new Date(localTime + localOffset + gmt5Offset * 60000);

  const year = gmt5Time.getUTCFullYear();
  const month = String(gmt5Time.getUTCMonth() + 1).padStart(2, "0");
  const day = String(gmt5Time.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
