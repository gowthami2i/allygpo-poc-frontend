import { DateFormats } from "../constants/constant";

export const formatDate = (datetime: string, format: string): string => {
  if (!datetime) {
    return "";
  }

  const date = new Date(datetime);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  switch (format) {
    case DateFormats.DD_MM_YYYY_SLASH:
      return `${day}/${month}/${year}`;
    case DateFormats.DD_MMM_YYYY:
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${day} ${months[date.getMonth()]} ${year}`;
    default:
      return "";
  }
};
