export type RentModalFinishProps = {
  modalClose: () => void;
  setIsRent: (value: boolean) => void;
};

const RentModalFinish = ({ modalClose, setIsRent }: RentModalFinishProps) => {
  const handleFinish = () => {
    setIsRent(true);
    modalClose();
  };

  return (
    <div className="max-w-2xl fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-10 z-50 flex justify-center items-center">
      <div className="w-380 h-246 bg-white mx-20 rounded-8 flex justify-center items-center">
        <div className="flex flex-end items-center p-10">
          <div className="p-4">
            <div className="w-full p-24 pl-0 ml-20 flex flex-col justify-between">
              <div className="flex flex-col">
                <p className="text-18 font-bold">대여완료!</p>
              </div>
              <div className="flex flex-col text-15 leading-22 text-gray-700 mt-16">
                <div>
                  사물함 비밀번호: <p className="inline font-bold">0000</p>
                </div>
                <div>
                  <div>번호를 입력하면 우산함이 열릴 거예요!</div>
                  <div>UPbrella 서비스를 이용해주셔서 감사합니다 :)</div>
                  <div className="mt-16 text-primary-500 font-semibold text-14 leading-20">
                    14일 이내 반납 시 보증금 전액 환급됩니다.
                  </div>
                </div>
              </div>
              <div className="flex mt-16">
                <div
                  className="w-full border font-semibold leading-24 mr-8 rounded-8 text-white py-12 text-center bg-primary-500 cursor-pointer"
                  onClick={handleFinish}
                >
                  확인
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentModalFinish;
