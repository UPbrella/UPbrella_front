import SignUpFormAllow from "@/features/auth/ui/SignUpFormAllow";
import SignUpFormAllowChevron from "@/features/auth/ui/SignUpFormAllowChevron";
import SignUpFormAllowText from "@/features/auth/ui/SignUpFormAllowText";

type SignUpAllowBoxProps = {
  isAllow?: boolean;
  label: string;
  onClickAllow: () => void;
  onClickDetailPage: () => void;
};

const SignUpAllowBox = ({
  isAllow,
  label,
  onClickAllow,
  onClickDetailPage,
}: SignUpAllowBoxProps) => {
  return (
    <section className="flex justify-between px-8 py-12 items-center">
      <div className="flex">
        <div className="mr-8">
          <SignUpFormAllow isAllow={isAllow} onClick={onClickAllow} />
        </div>
        <SignUpFormAllowText label={label} onClick={onClickAllow} />
      </div>
      <div>
        <SignUpFormAllowChevron onClick={onClickDetailPage} />
      </div>
    </section>
  );
};

export default SignUpAllowBox;
