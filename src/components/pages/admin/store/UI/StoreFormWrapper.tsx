import { ReactNode } from "react";

type TProps = {
  label: string;
  children: ReactNode;
  isRequired?: boolean;
};

const StoreFormWrapper = ({ label, children, isRequired = false }: TProps) => {
  return (
    <div className="flex gap-4 items-center justify-between">
      <div className="w-[300px]">
        {label} {isRequired && <span className="text-red">*</span>}
      </div>
      {children}
    </div>
  );
};

export default StoreFormWrapper;
