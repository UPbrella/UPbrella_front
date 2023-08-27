import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export type SignUpFormAllowProps = {
  isAllow?: boolean;
  onClick: () => void;
};

const SignUpFormAllow = ({ isAllow, onClick }: SignUpFormAllowProps) => {
  const isAllowColor = isAllow ? "text-black" : "text-gray-300";

  return <CheckCircleOutlineIcon className={`w-24 h-24 ${isAllowColor}`} onClick={onClick} />;
};

export default SignUpFormAllow;
