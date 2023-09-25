export type SignUpFormAllAllowTextProps = {
  label: string;
  onClick: () => void;
};

const SignUpFormAllAllowText = ({ label, onClick }: SignUpFormAllAllowTextProps) => {
  return (
    <div className="text-black text-16 font-semibold leading-24" onClick={onClick}>
      {label}
    </div>
  );
};
export default SignUpFormAllAllowText;
