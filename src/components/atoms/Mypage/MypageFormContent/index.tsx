export type MypageFormContentProps = {
  label: string;
};

const MypageFormContent = ({ label }: MypageFormContentProps) => {
  return (
    <div className="text-gray-600 text-16 font-normal leading-24 flex items-center w-full">
      {label}
    </div>
  );
};
export default MypageFormContent;
