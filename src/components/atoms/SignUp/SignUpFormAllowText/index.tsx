export type SignUpFormAllowTextProps = {
  label: string;
  onClick: () => void;
};

const SignUpFormAllowText = ({ label, onClick }: SignUpFormAllowTextProps) => {
  return (
    <div className="text-black text-16 font-normal leading-24" onClick={onClick}>
      {label}
    </div>
  );
};
export default SignUpFormAllowText;
