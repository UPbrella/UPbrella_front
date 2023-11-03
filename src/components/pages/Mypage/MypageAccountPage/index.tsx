import MypageModal from "@/components/molecules/Mypage/MypageModal";
import MypageModalChildren from "@/components/molecules/Mypage/MypageModalChildren";
import MypageModalTwoBtnChildren from "@/components/molecules/Mypage/MypageModalTwoBtnChildren";
import Footer from "@/components/organisms/Footer";
import MypageAccountCard from "@/components/organisms/Mypage/MypageAccountCard";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
import { $axios } from "@/lib/axios";
import { loginInfo, loginState } from "@/recoil";
import { BASIC_ROUTES_URL } from "@/routes/basicRouter";
import { TAccountPageInputs, TAccountPageStatus } from "@/types/mypage/MypageTypes";
import { validateNumber } from "@/utils/utils";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

const MypageAccountPage = () => {
  const [inputs, setInputs] = useState<TAccountPageInputs>({
    bank: "",
    accountNumber: "",
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [hasBankAccountInfo, setHasBankAccountInfo] = useState<boolean>(false);
  const [status, setStatus] = useState<TAccountPageStatus>({
    isDeleted: false,
    isChanged: false,
    isRegistered: false,
  });

  const [isLogin] = useRecoilState<boolean>(loginState);
  const loginInfoValue = useRecoilValueLoadable(loginInfo);
  const bankInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

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
    if (!isLogin) {
      toast.error(`로그인 세션이 만료되었습니다. 
      다시 로그인해주세요.`);
      navigate(BASIC_ROUTES_URL.root.path());
    }
  }, [loginInfoValue.state, loginInfoValue.contents, isLogin, navigate]);
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "accountNumber") {
      if (validateNumber(value)) {
        setInputs({ ...inputs, [name]: value });
      }
      return;
    }

    setInputs({ ...inputs, [name]: value });
  };

  const onClickBankArrow = () => {
    setIsOpenModal(!isOpenModal);
    setIsBottomSheetOpen(!isBottomSheetOpen);
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
  const setBank = (value: string) => {
    setInputs({ ...inputs, bank: value });
  };

  const handleDeleteAccount = async () => {
    await $axios.delete("/users/bankAccount", { withCredentials: true }).then(() => {
      const data = {
        ["bank"]: "",
        ["accountNumber"]: "",
      };
      setInputs({ ...data });
      setHasBankAccountInfo(false);
      setStatus({ ...status, isDeleted: false });
    });
  };
  //   계좌 등록과 수정 모두 같은 patch api 요청
  const handleChangeAccount = async () => {
    await $axios.patch("/users/bankAccount", { ...inputs }, { withCredentials: true }).then(() => {
      setInputs({ ...inputs });
      setHasBankAccountInfo(true);
      setStatus({ ...status, isChanged: true });
    });
  };
  const handleRegisterAccount = async () => {
    await $axios.patch("/users/bankAccount", { ...inputs }, { withCredentials: true }).then(() => {
      setInputs({ ...inputs });
      setHasBankAccountInfo(true);
      setStatus({ ...status, isRegistered: true });
    });
  };

  return (
    <div className="flex flex-col items-center justify-between flex-1">
      <div className="flex flex-col w-full xl:w-[1280px] xl:mt-24 xl:px-40 lg:max-w-640 lg:py-20 lg:w-full lg:px-20">
        <div className="mb-32 font-semibold text-black text-24 leading-32">MYPAGE</div>
        <div className="xl:flex">
          <div className="xl:mr-32">
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
              isBottomSheetOpen={isBottomSheetOpen}
              setIsBottomSheetOpen={setIsBottomSheetOpen}
              setBank={setBank}
              handleClose={handleClose}
              handleClickBank={handleClickBank}
              hasBankAccountInfo={hasBankAccountInfo}
              isInputCompleted={bank !== "" && accountNumber !== ""}
              onClickDeleteButton={() => {
                setStatus({ ...status, isDeleted: true });
              }}
              onClickChangeButton={handleChangeAccount}
              onClickRegisterButton={handleRegisterAccount}
            />
          </div>
          {status.isDeleted ? (
            <MypageModal width="320">
              <MypageModalTwoBtnChildren
                label="계좌를 삭제하시겠어요?"
                btnLabel="삭제"
                onClickCancel={() => {
                  setStatus({ ...status, isDeleted: false });
                }}
                onClickOkay={handleDeleteAccount}
              />
            </MypageModal>
          ) : null}
          {status.isChanged ? (
            <MypageModal width="320">
              <MypageModalChildren
                label="계좌 변경 완료!"
                onClickBtn={() => {
                  setStatus({ ...status, isChanged: false });
                }}
              />
            </MypageModal>
          ) : null}
          {status.isRegistered ? (
            <MypageModal width="320">
              <MypageModalChildren
                label="계좌 등록 완료!"
                onClickBtn={() => {
                  setStatus({ ...status, isRegistered: false });
                }}
              />
            </MypageModal>
          ) : null}
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default MypageAccountPage;
