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
