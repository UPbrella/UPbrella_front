/* eslint-disable @typescript-eslint/no-explicit-any */
import { DAY_OF_WEEK } from "@/constants/Date";
import { AxiosError } from "axios";

// 라우트 type
export type TRoute = {
  name: string;
  path: (params?: any) => string;
  component: () => JSX.Element;
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

type TErrors = TApiResponse<null>;

export type TCustomError = AxiosError<TErrors>;
