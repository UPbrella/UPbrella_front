import SignUpFormSubTitle from "@/features/auth/ui/SignUpFormSubtitle";
import SignUpFormTitle from "@/features/auth/ui/SignUpFormTitle";

type SignUpTextProps = {
  labelTitle: string;
  labelSubtitle1: string;
  labelSubtitle2?: string;
  labelSubtitleBold?: string;
  labelSubtitleNextLine?: string;
};

const SignUpText = ({
  labelTitle,
  labelSubtitle1,
  labelSubtitle2,
  labelSubtitleBold,
  labelSubtitleNextLine,
}: SignUpTextProps) => {
  return (
    <section>
      <div className="mb-4">
        <SignUpFormTitle label={labelTitle} />
      </div>
      <div>
        <SignUpFormSubTitle
          label1={labelSubtitle1}
          label2={labelSubtitle2}
          labelBold={labelSubtitleBold}
          labelNextLine={labelSubtitleNextLine}
        />
      </div>
    </section>
  );
};

export default SignUpText;
