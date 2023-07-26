import { Typography } from "@mui/material";
import { ReactNode } from "react";

type TProps = {
  title: string;
  children: ReactNode;
};

// 컨텐츠 타이틀
const StoreContentTitle = ({ title, children }: TProps) => {
  return (
    <div className="flex gap-10">
      <Typography variant="h5">{title}</Typography>
      <div className="flex gap-3">{children}</div>
    </div>
  );
};

export default StoreContentTitle;
