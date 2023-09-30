export type MypageModalNotAllowedChildrenProps = {
  label: string;
  notAllowedMessage: string;
  onClickBtn: () => void;
};
const MypageModalNotAllowedChildren = ({
  label,
  notAllowedMessage,
  onClickBtn,
}: MypageModalNotAllowedChildrenProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full">
        <div className="text-gray-700 text-18 font-semibold leading-24">{label}</div>
      </div>
      <div className="mt-16 xl:mb-24 lg:mb-16 text-15 font-normal leading-22 font-gray-700">
        {notAllowedMessage}
      </div>
      <button
        className="w-160 h-56 px-32 flex justify-center items-center bg-primary-500 rounded-8"
        onClick={onClickBtn}
      >
        <p className="text-white text-18 font-semibold leading-24">확인</p>
      </button>
    </div>
  );
};
export default MypageModalNotAllowedChildren;
