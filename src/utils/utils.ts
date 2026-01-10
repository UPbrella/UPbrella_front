// 휴대폰 번호 포맷팅 함수
// ex. 01012345678 -> 010-1234-5678
export const formatPhoneNumber = (num: string) => {
  if (num.length > 13) {
    return num.substring(0, 13);
  }

  return num
    .replace(/[^0-9]/g, "") // 숫자를 제외한 모든 문자 제거
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

// 배열 수정 함수 (setState)
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

// 배열 삭제 함수
export const deleteItemAtIndex = <T>({ arr, index }: { arr: T[]; index: number }) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

// 숫자 입력 검증 함수
export const validateNumber = (num: string) => {
  return /^\d+$/.test(num) || num === "";
};

// 전화번호 유효성 검사 함수
// 빈 값이거나 010-0000-0000 형식(13자)이면 유효
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
