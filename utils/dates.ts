import { format, differenceInDays, DateArg } from "date-fns";

const now = new Date();

const format_date = (date: DateArg<Date> & {}) => {
  return format(date, "yyyy-MM-dd");
};

const difference_in_days = (
  from: DateArg<Date> & {},
  to: DateArg<Date> & {} = now
) => {
  return differenceInDays(from, to);
};

export { format_date, difference_in_days };
