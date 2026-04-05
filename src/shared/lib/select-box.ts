export const createSelectItems = (itemObj: Record<string, string>) => {
  return Object.keys(itemObj).map((key) => {
    return {
      label: itemObj[key],
      value: key,
    };
  });
};
