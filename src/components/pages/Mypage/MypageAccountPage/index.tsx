import MypageAccountCard from "@/components/organisms/Mypage/MypageAccountCard";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";

export type TAccountPageInputs = {
  bank: string;
  accountNumber: string;
};

const MypageAccountPage = () => {
  const [inputs, setInputs] = useState<TAccountPageInputs>({
    bank: "",
    accountNumber: "",
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isInputCompleted, setIsInputCompleted] = useState<boolean>(false);

  const bankInput = useRef<HTMLInputElement>(null);

  const { bank, accountNumber } = inputs;

  useEffect(() => {
    const handleRegisterButtonActivated = () => {
      if (bank !== "" && accountNumber !== "") {
        setIsInputCompleted(true);
      } else {
        setIsInputCompleted(false);
      }
    };
    handleRegisterButtonActivated();
  }, [bank, accountNumber]);
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onClickBankArrow = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleClose = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleClickBank = (event: MouseEvent<HTMLDivElement>) => {
    const bankName = event.currentTarget.textContent; // 선택한 은행의 이름을 가져옴
    if (bankInput.current) {
      setInputs({ ...inputs, [bankInput.current.name]: bankName });
      setIsOpenModal(!isOpenModal);
    }
  };

  return (
    <div className="flex justify-center w-[1280px] mt-24 px-40">
      <div className="flex flex-col w-full">
        <div className="text-black text-24 font-semibold leading-32 mb-32">MYPAGE</div>
        <div className="flex">
          <div className="mr-32">
            <MypageLeftCard />
          </div>
          <div className="w-full">
            <MypageAccountCard
              bank={bank}
              accountNumber={accountNumber}
              onChangeValue={handleInputValue}
              onClickBankArrow={onClickBankArrow}
              bankRef={bankInput}
              isOpenModal={isOpenModal}
              handleClose={handleClose}
              handleClickBank={handleClickBank}
              hasBankAccountInfo={false}
              isInputCompleted={isInputCompleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MypageAccountPage;
