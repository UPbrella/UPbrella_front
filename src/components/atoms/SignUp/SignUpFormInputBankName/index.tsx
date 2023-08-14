import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type SignUpFormInputBankNameProps = {
  //   isClicked?: boolean; TODO
  label: string;
};

const SignUpFormInputBankName = ({ label }: SignUpFormInputBankNameProps) => {
  return (
    <div>
      <div
        className="flex items-center justify-between	 w-120 h-48 p-12 rounded-8 border border-solid border-gray-300 focus:outline-none"
        placeholder={label}
      >
        <p className="text-gray-400 text-15 leading-22 font-normal">{label}</p>
        <ExpandMoreIcon className="text-gray-700" />
      </div>
    </div>
  );
};
export default SignUpFormInputBankName;
