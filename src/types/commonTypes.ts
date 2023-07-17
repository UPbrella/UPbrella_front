import { ReactNode } from "react";

// 라우트 type
export type TRoute = {
  name: string;
  path: string;
  component: () => JSX.Element;
};

// 테이블 column type
export type TTableColumn<T> = {
  id: T;
  label: string;
  align: "left" | "right" | "center";
  formatFn?: (param: string | boolean | string[]) => ReactNode;
};
