import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type SignUpFormAllowChevronProps = {
  isClicked?: boolean;
};

const SignUpFormAllowChevron = ({ isClicked }: SignUpFormAllowChevronProps) => {
  return <div>{isClicked ? <ExpandMoreIcon /> : <ChevronRightIcon />}</div>;
};
export default SignUpFormAllowChevron;
