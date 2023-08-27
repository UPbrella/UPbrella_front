import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ChangeEvent } from "react";

export type SignUpFormInputBankNameProps = {
  //   isClicked?: boolean; TODO
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SignUpFormInputBankName = ({
  label,
  name,
  value,
  onChange,
}: SignUpFormInputBankNameProps) => {
  return (
    <div>
      <div className="flex items-center justify-between	 w-120 h-48 p-12 rounded-8 border border-solid border-gray-300">
        <input
          className="w-full placeholder-gray-400 text-15 leading-22 font-normal focus:outline-none"
          placeholder={label}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
        />
        <ExpandMoreIcon className="text-gray-700" />
      </div>
    </div>
  );
};
export default SignUpFormInputBankName;
