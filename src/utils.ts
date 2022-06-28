import numeral from "numeral";

export const LIKE_HEX_COLOR = "#FF69B4";

export const formatNumberToDisplay = (value: number) => {
  let format = "0 a";

  if (1000 < value && value < 100000) {
    format = "0.0 a";
  }

  return numeral(value).format(format);
};

export const copyTextToClipboard = async (text: string) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
};

export const getFormData = (e: React.FormEvent<HTMLFormElement>) => {
  const data = new FormData(e.currentTarget);
  return data;
};
