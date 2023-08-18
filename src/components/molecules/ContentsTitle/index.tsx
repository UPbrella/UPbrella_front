import { Typography } from "@mui/material";
import { ReactNode } from "react";

type TProps = {
  title: string;
  children?: ReactNode;
};

const ContentsTitle = ({ title, children }: TProps) => {
  return (
    <div className="flex gap-10">
      <Typography variant="h5">{title}</Typography>
      {children && <div className="flex gap-3">{children}</div>}
    </div>
  );
};

export default ContentsTitle;
