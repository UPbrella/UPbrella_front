import MypageModal from "@/pages/mypage/ui/MypageModal";
import MypageModalChildren from "@/pages/mypage/ui/MypageModalChildren";
import MypageModalTwoBtnChildren from "@/pages/mypage/ui/MypageModalTwoBtnChildren";
import MypageAccountCard from "@/pages/mypage/ui/MypageAccountCard";
import MypageLayout from "@/pages/mypage/ui/MypageLayout";
import { $axios } from "@/shared/api";
import { loginInfo } from "@/features/auth";
import { BASIC_ROUTES_URL } from "@/app/router/routes";
import { TAccountPageInputs, TAccountPageStatus } from "@/entities/user/model/types";
import { validateNumber } from "@/shared/lib/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { useTranslation } from "react-i18next";

const MypageAccountPage = () => {
  const { t } = useTranslation();
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
              ["accountNumber"]: loginInfoValue.contents.accountNumber ?? "",
            };
            setInputs({ ...data });
            setHasBankAccountInfo(true);
          } else {
            setHasBankAccountInfo(false);
          }
          break;
        case "loading":
          return;
        case "hasError":
          toast.error(t("toast.error.sessionExpired"));
          navigate(BASIC_ROUTES_URL.root.path());
          return;
      }
    };

    getBankAccountInfo();
  }, [loginInfoValue.state, loginInfoValue.contents, navigate, t]);
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
    <MypageLayout
      renderChildren={() => (
        <>
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
                label={t("mypage.account.deleteConfirm")}
                btnLabel={t("mypage.account.deleteBtn")}
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
                label={t("mypage.account.changeComplete")}
                onClickBtn={() => {
                  setStatus({ ...status, isChanged: false });
                }}
              />
            </MypageModal>
          ) : null}
          {status.isRegistered ? (
            <MypageModal width="320">
              <MypageModalChildren
                label={t("mypage.account.registerComplete")}
                onClickBtn={() => {
                  setStatus({ ...status, isRegistered: false });
                }}
              />
            </MypageModal>
          ) : null}
        </>
      )}
    />
  );
};
export default MypageAccountPage;
