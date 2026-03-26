type SignUpFormAllAllowTextProps = {
  label: string;
  onClick: () => void;
};

const SignUpFormAllAllowText = ({ label, onClick }: SignUpFormAllAllowTextProps) => {
  return (
    <div className="font-semibold text-black cursor-pointer text-16 leading-24" onClick={onClick}>
      {label}
    </div>
  );
};
export default SignUpFormAllAllowText;
