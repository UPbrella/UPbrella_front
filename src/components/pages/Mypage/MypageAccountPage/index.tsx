import MypageAccountCard from "@/components/organisms/Mypage/MypageAccountCard";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
import { $axios } from "@/lib/axios";
import { loginInfo } from "@/recoil";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useRecoilValueLoadable } from "recoil";

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
  const [hasBankAccountInfo, setHasBankAccountInfo] = useState<boolean>(false);

  const loginInfoValue = useRecoilValueLoadable(loginInfo);
  const bankInput = useRef<HTMLInputElement>(null);

  const { bank, accountNumber } = inputs;

  useEffect(() => {
    const getBankAccountInfo = async () => {
      switch (loginInfoValue.state) {
        case "hasValue":
          if (loginInfoValue.contents.bank) {
            const data = {
              ["bank"]: loginInfoValue.contents.bank,
              ["accountNumber"]: loginInfoValue.contents.accountNumber,
            };
            setInputs({ ...data });
            setHasBankAccountInfo(true);
          } else {
            setHasBankAccountInfo(false);
          }
          break;
        case "loading":
          <div>Loading...</div>;
          break;
        case "hasError":
          break;
      }
    };

    getBankAccountInfo();
  }, [loginInfoValue.state, loginInfoValue.contents]);
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

  const handleDeleteAccount = async () => {
    await $axios.delete("/users/bankAccount", { withCredentials: true }).then(() => {
      const data = {
        ["bank"]: "",
        ["accountNumber"]: "",
      };
      setInputs({ ...data });
      setHasBankAccountInfo(false);
      alert("계좌 삭제 완료!");
    });
  };
  //   계좌 등록과 수정 모두 같은 patch api 요청
  const handleChangeAccount = async () => {
    await $axios.patch("/users/bankAccount", { ...inputs }, { withCredentials: true }).then(() => {
      setInputs({ ...inputs });
      setHasBankAccountInfo(true);
      alert("계좌 변경 완료!");
    });
  };
  const handleRegisterAccount = async () => {
    await $axios.patch("/users/bankAccount", { ...inputs }, { withCredentials: true }).then(() => {
      setInputs({ ...inputs });
      setHasBankAccountInfo(true);
      alert("계좌 등록 완료!");
    });
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
              hasBankAccountInfo={hasBankAccountInfo}
              isInputCompleted={bank !== "" && accountNumber !== ""}
              onClickDeleteButton={handleDeleteAccount}
              onClickChangeButton={handleChangeAccount}
              onClickRegisterButton={handleRegisterAccount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MypageAccountPage;
