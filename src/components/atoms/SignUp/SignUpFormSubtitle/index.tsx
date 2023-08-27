export type SignUpFormSubTitleProps = {
  label1: string;
  label2?: string;
  labelBold?: string;
  labelNextLine?: string;
};

const SignUpFormSubTitle = ({
  label1,
  label2,
  labelBold,
  labelNextLine,
}: SignUpFormSubTitleProps) => {
  return (
    <div>
      <div className="flex">
        <p>{label1}</p>
        <p className="font-semibold px-5">{labelBold}</p>
        <p>{label2}</p>
      </div>
      <div>{labelNextLine}</div>
    </div>
  );
};
export default SignUpFormSubTitle;
