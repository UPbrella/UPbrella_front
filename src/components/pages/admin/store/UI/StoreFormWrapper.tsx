import { Divider } from "@mui/material";
import { ReactNode } from "react";

type TProps = {
  label: string;
  children: ReactNode;
  isRequired?: boolean;
};

const StoreFormWrapper = ({ label, children, isRequired = false }: TProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="w-[300px]">
          {label} {isRequired && <span className="text-red">*</span>}
        </div>
        {children}
      </div>
      <Divider />
    </>
  );
};

export default StoreFormWrapper;
