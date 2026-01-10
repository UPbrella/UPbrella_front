import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export type SignUpFormAllowProps = {
  isAllow?: boolean;
  onClick: () => void;
};

const SignUpFormAllow = ({ isAllow, onClick }: SignUpFormAllowProps) => {
  return (
    <CheckCircleOutlineIcon
      sx={{
        width: 24,
        height: 24,
        color: isAllow ? "black" : "#d1d5db", // gray-300
        transition: "color 0.15s ease",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};

export default SignUpFormAllow;
