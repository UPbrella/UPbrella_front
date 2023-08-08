// selectBox (dropdown) 에 쓰이는 items(options) 생성 함수
export const createSelectItems = (itemObj: Record<string, string>) => {
  return Object.keys(itemObj).map((key) => {
    return {
      label: itemObj[key],
      value: key,
    };
  });
};
