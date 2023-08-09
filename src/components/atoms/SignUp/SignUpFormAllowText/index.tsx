export type SignUpFormAllowTextProps = {
  label: string;
};

const SignUpFormAllowText = ({ label }: SignUpFormAllowTextProps) => {
  return <div className="text-black text-16 font-normal leading-24">{label}</div>;
};
export default SignUpFormAllowText;
