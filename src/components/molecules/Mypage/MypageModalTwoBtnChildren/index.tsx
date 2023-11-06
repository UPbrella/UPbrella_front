export type MypageModalTwoBtnChildrenProps = {
  label: string;
  content?: string[];
  btnLabel: string;
  onClickCancel: () => void;
  onClickOkay: () => void;
};
const MypageModalTwoBtnChildren = ({
  label,
  btnLabel,
  content,
  onClickCancel,
  onClickOkay,
}: MypageModalTwoBtnChildrenProps) => {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="flex justify-center text-gray-700 text-24 font-semibold leading-32 xl:mb-24 lg:mb-16 lg:text-18">
        {label}
      </div>
      {content ? (
        <div className="xl:mb-24 lg:mb-16">
          <div className="mb-8">
            <div>{content[0]}</div>
            <div>{content[1]}</div>
          </div>
          <div>
            <div className="flex">
              <p className="mx-8">•</p>
              {content[2]}
            </div>
            <div className="flex">
              <p className="mx-8">•</p>
              {content[3]}
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex w-full">
        <button
          className="w-full h-56 px-32 flex justify-center items-center bg-white rounded-8 border border-gray-300 mr-8"
          onClick={onClickCancel}
        >
          <p className="text-gray-700 text-18 font-semibold leading-24 lg:text-16">취소</p>
        </button>
        <button
          className="w-full h-56 px-32 flex justify-center items-center bg-primary-500 rounded-8"
          onClick={onClickOkay}
        >
          <p className="text-white text-18 font-semibold leading-24 lg:text-16">{btnLabel}</p>
        </button>
      </div>
    </div>
  );
};
export default MypageModalTwoBtnChildren;
