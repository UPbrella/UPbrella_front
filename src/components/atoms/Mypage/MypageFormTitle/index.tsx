export type MypageFormTitleProps = {
  label: string;
};

const MypageFormTitle = ({ label }: MypageFormTitleProps) => {
  return (
    <div className="text-gray-600 text-16 font-semibold leading-24 flex items-center w-56">
      {label}
    </div>
  );
};
export default MypageFormTitle;
