import SignUpFormAllow from "@/components/atoms/SignUp/SignUpFormAllow";
import SignUpFormAllowChevron from "@/components/atoms/SignUp/SignUpFormAllowChevron";
import SignUpFormAllowText from "@/components/atoms/SignUp/SignUpFormAllowText";

export type SignUpAllowBoxProps = {
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
