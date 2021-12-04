import { set } from "date-fns";

const now = new Date();

const getSampleHour = (hour) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

export const selectedInterval = [
    getSampleHour(12),
    getSampleHour(14)
];