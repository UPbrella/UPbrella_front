import { DAY_OF_WEEK } from "@/shared/constants/date";
import { AxiosError } from "axios";
import type { ComponentType, LazyExoticComponent } from "react";

export type TRoute = {
  name: string;
  path: (params?: any) => string;
  component: ComponentType | LazyExoticComponent<ComponentType>;
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
