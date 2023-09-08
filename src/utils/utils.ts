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
