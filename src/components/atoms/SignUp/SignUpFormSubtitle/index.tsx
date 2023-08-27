export type SignUpFormSubTitleProps = {
  label1: string;
  label2?: string;
  labelBold?: string;
};

const SignUpFormSubTitle = ({ label1, label2, labelBold }: SignUpFormSubTitleProps) => {
  return (
    <div className="flex">
      <p>{label1}</p>
      <p className="font-semibold">{labelBold}</p>
      <p>{label2}</p>
    </div>
  );
};
export default SignUpFormSubTitle;
