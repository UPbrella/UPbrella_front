import { ReactNode } from "react";

type TProps = {
  label: string;
  children: ReactNode;
  isRequired?: boolean;
};

const StoreFormWrapper = ({ label, children, isRequired = false }: TProps) => {
  return (
    <div className="flex gap-4 items-center justify-between">
      <div className="w-[220px]">
        {label} {isRequired && <span>*</span>}
      </div>
      {children}
    </div>
  );
};

export default StoreFormWrapper;
