import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export type SignUpFormAllowProps = {
  isAllow?: boolean;
};

const SignUpFormAllow = ({ isAllow }: SignUpFormAllowProps) => {
  const isAllowColor = isAllow ? "text-black" : "text-gray-300";

  return <CheckCircleOutlineIcon className={`w-24 h-24 ${isAllowColor}`} />;
};

export default SignUpFormAllow;
