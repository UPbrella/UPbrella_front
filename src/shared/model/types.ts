/* eslint-disable @typescript-eslint/no-explicit-any */
import { DAY_OF_WEEK } from "@/shared/constants/date";
import { AxiosError } from "axios";

export type TRoute = {
  name: string;
  path: (params?: any) => string;
  component: () => JSX.Element;
};

export type TApiResponse<T> = {
  status: "success" | "fail";
  code: 200 | 400 | 401 | 403 | 404 | 500;
  message: string;
  data: T;
};

export type TDayOfWeek = keyof typeof DAY_OF_WEEK;

type TErrors = TApiResponse<null>;

export type TCustomError = AxiosError<TErrors>;
