import { set } from "date-fns";

const now = new Date();

const getSampleHour = (hour) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

export const selectedInterval = [
    getSampleHour(12),
    getSampleHour(14)
];

export function mapValueToHour(value) {
  const hours = Math.floor(value).toString();
  const minutes = value % 1 ? "30" : "00";
  const filledHours = hours < 10 ? "0" + hours : hours
  return filledHours + ':' + minutes;
}