import SignUpFormAllow from "@/features/auth/ui/SignUpFormAllow";
import SignUpFormAllAllowText from "@/features/auth/ui/SignUpFormAllAllowText";

type SignUpAllAllowBoxProps = {
  isAllow?: boolean;
  label: string;
  onClickAllow: () => void;
};

const SignUpAllAllowBox = ({ isAllow, label, onClickAllow }: SignUpAllAllowBoxProps) => {
  return (
    <section className="flex px-8 py-12 items-center rounded-5 bg-gray-100">
      <div className="mr-8">
        <SignUpFormAllow isAllow={isAllow} onClick={onClickAllow} />
      </div>
      <SignUpFormAllAllowText label={label} onClick={onClickAllow} />
    </section>
  );
};

export default SignUpAllAllowBox;
