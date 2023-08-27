import { DAY_OF_WEEK } from "@/constants/Date";
import {
  TClassification,
  TStoreBusinessHours,
  TStoreImage,
  TSubClassification,
} from "@/types/admin/StoreTypes";
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
  formatFn?: (
    param:
      | string
      | number
      | boolean
      | TClassification
      | TSubClassification
      | TStoreImage[]
      | TStoreBusinessHours[]
      | string[]
  ) => ReactNode;
};

// 서버에서 내려주는 응답 구조
export type TApiResponse<T> = {
  status: "success" | "fail";
  code: 200 | 400 | 401 | 403 | 404 | 500;
  message: string;
  data: T;
};

// day enum
export type TDayOfWeek = keyof typeof DAY_OF_WEEK;
