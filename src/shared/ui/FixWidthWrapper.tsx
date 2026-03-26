import { ReactNode } from "react";

export const FixWidthWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[1440px] px-40 mx-auto md:px-20 sm:mx-0">{children}</div>;
};
