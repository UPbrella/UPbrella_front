import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type SignUpFormInputBankNameProps = {
  //   isClicked?: boolean;
  label: string;
};

const SignUpFormInputBankName = ({ label }: SignUpFormInputBankNameProps) => {
  return (
    <div>
      <div
        className="flex items-center justify-start w-120 h-48 p-12 text-15 text-gray-700 leading-22 font-normal placeholder-gray-400 placeholder:text-15 rounded-8 border border-solid border-gray-300 focus:outline-none"
        placeholder={label}
      >
        <p>{label}</p>
        <ExpandMoreIcon />
      </div>
    </div>
  );
};
export default SignUpFormInputBankName;
