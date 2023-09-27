export type MypageModalChildrenProps = {
  label: string;
  onClickBtn: () => void;
};
const MypageModalChildren = ({ label, onClickBtn }: MypageModalChildrenProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-gray-700 text-24 font-semibold leading-32 mb-24">{label}</div>
      <button
        className="w-160 h-56 px-32 flex justify-center items-center bg-primary-500 rounded-8"
        onClick={onClickBtn}
      >
        <p className="text-white text-18 font-semibold leading-24">확인</p>
      </button>
    </div>
  );
};
export default MypageModalChildren;
