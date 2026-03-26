export const formatPhoneNumber = (num: string) => {
  if (num.length > 13) {
    return num.substring(0, 13);
  }

  return num.replace(/[^0-9]/g, "").replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

export const replaceItemAtIndex = <T>({
  arr,
  index,
  newValue,
}: {
  arr: T[];
  index: number;
  newValue: T;
}) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const validateNumber = (num: string) => {
  return /^\d+$/.test(num) || num === "";
};

export const PHONE_NUMBER_ERROR_MESSAGE = "010 뒤 8자리를 입력해주세요.";

export const isValidPhoneNumber = (value: string | undefined | null): boolean => {
  if (!value || value.length === 0) return true;
  return value.length === 13;
};

export const getPhoneNumberError = (value: string | undefined | null): string => {
  if (!value || value.length === 0) return "";
  if (value.length !== 13) return PHONE_NUMBER_ERROR_MESSAGE;
  return "";
};
