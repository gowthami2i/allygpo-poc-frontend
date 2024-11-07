import { DateFormats } from "../constants/appConstants";

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
  switch (format) {
    case DateFormats.DD_MM_YYYY_SLASH:
      return `${day}/${month}/${year}`;
    case DateFormats.DD_MMM_YYYY:
      return `${day} ${months[date.getMonth()]} ${year}`;
    default:
      return "";
  }
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(",")[1]); // Remove "data:*/*;base64," prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const base64ToBlob = (
  base64: string,
  mimeType: string = "application/pdf"
): Blob => {
  const byteCharacters = atob(base64);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
};

export const isEndOfSentence = (text: string): boolean => {
  return /[.!?]$/.test(text.trim());
};

export const isIndented = (currentItem: any, prevItem: any): boolean => {
  const horizontalDifference = Math.abs(
    currentItem.transform[4] - prevItem.transform[4]
  );
  return horizontalDifference > 25; // Adjust this threshold based on testing
};
