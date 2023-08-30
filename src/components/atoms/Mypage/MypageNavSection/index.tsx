export type MypageNavSectionProps = {
  navName: string;
  isClick: boolean;
  onClick?: () => void;
};

const MypageNavSection = ({ navName, isClick, onClick }: MypageNavSectionProps) => {
  const bgColor = isClick ? "bg-primary-300" : "bg-white";
  return (
    <div className={`h-56 px-32 flex items-center rounded-8 ${bgColor} `} onClick={onClick}>
      <p className="text-black text-18 font-semibold leading-24">{navName}</p>
    </div>
  );
};
export default MypageNavSection;
