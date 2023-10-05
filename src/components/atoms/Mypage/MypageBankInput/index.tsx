import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ChangeEvent } from "react";

export type MypageBankInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  bankRef: React.RefObject<HTMLInputElement>;
};

const MypageBankInput = ({
  label,
  name,
  value,
  onChange,
  onClick,
  bankRef,
}: MypageBankInputProps) => {
  return (
    <div>
      <div
        className="flex items-center justify-between h-48 p-12 rounded-8 border border-solid border-gray-300"
        onClick={onClick}
      >
        <input
          className="w-full placeholder-gray-400 text-15 leading-22 font-normal focus:outline-none"
          placeholder={label}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          ref={bankRef}
          readOnly
        />
        <ExpandMoreIcon className="text-gray-700" />
      </div>
    </div>
  );
};
export default MypageBankInput;
