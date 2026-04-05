import BottomSheet from "@/shared/ui/BottomSheet";
import BankContent from "@/features/rent-form/ui/BankContent";
import MypageBankAccountInput from "@/pages/mypage/ui/MypageBankAccountInput";
import BankModal from "@/shared/ui/BankModal";
import { BANKS, getBankDisplayName } from "@/shared/constants/bank-icons";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

type MypageAccountCardProps = {
  bank: string;
  accountNumber: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickBankArrow: () => void;
  bankRef: React.RefObject<HTMLInputElement>;
  isOpenModal: boolean;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (value: boolean) => void;
  setBank: (value: string) => void;
  handleClose: () => void;
  hasBankAccountInfo: boolean;
  isInputCompleted: boolean;
  onClickDeleteButton: () => void;
  onClickChangeButton: () => void;
  onClickRegisterButton: () => void;
};
const MypageAccountCard = ({
  bank,
  accountNumber,
  onChangeValue,
  onClickBankArrow,
  bankRef,
  isOpenModal,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  setBank,
  handleClose,
  hasBankAccountInfo,
  isInputCompleted,
  onClickDeleteButton,
  onClickChangeButton,
  onClickRegisterButton,
}: MypageAccountCardProps) => {
  const { t } = useTranslation();
  return (
    <div className="xl:py-24 lg:pt-8">
      <div className="text-black text-32 font-semibold leading-40 mb-24 lg:hidden">
        {t("mypage.account.title")}
      </div>
      <MypageBankAccountInput
        bank={getBankDisplayName(bank, t)}
        accountNumber={accountNumber}
        onChangeValue={onChangeValue}
        onClick={onClickBankArrow}
        bankRef={bankRef}
      />
      {window.innerWidth > 1025 ? (
        <BankModal
          titleText={t("mypage.account.selectBank")}
          isOpen={isOpenModal}
          handleClose={handleClose}
          children={
            <div className="grid grid-cols-3 gap-4">
              {BANKS.map(({ apiKey, labelKey, icon }) => (
                <div key={apiKey}>
                  <div
                    className="w-full mb-8 p-12 flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => {
                      setBank(apiKey);
                      handleClose();
                    }}
                  >
                    <div className="w-24 h-24">
                      <img src={icon} alt={t(labelKey)} />
                    </div>
                    <div className="mt-4 text-15 leading-22 text-gray-700">{t(labelKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      ) : (
        <BottomSheet
          isBottomSheetOpen={isBottomSheetOpen}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
          snapPoints={[484, 272, 0]}
        >
          <BankContent setBank={setBank} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        </BottomSheet>
      )}

      <div className="flex justify-end mt-8">
        {hasBankAccountInfo ? (
          <button
            className="xl:h-56 lg:h-48 border border-solid border-gray-300 rounded-8 text-gray-700 xl:text-18 lg:text-16 font-semibold leading-24 xl:px-32 lg:px-20 mr-8"
            onClick={onClickDeleteButton}
          >
            {t("mypage.account.delete")}
          </button>
        ) : (
          <div></div>
        )}
        {hasBankAccountInfo
          ? (isInputCompleted && (
              <button
                className="xl:h-56 lg:h-48 border border-solid bg-primary-200 rounded-8 text-primary-500 xl:text-18 lg:text-16 font-semibold leading-24 xl:px-32 lg:px-20"
                onClick={onClickChangeButton}
              >
                {t("mypage.account.change")}
              </button>
            )) ||
            (!isInputCompleted && (
              <button className="xl:h-56 lg:h-48 border border-solid bg-primary-100 rounded-8 text-primary-300 xl:text-18 lg:text-16 font-semibold leadin-24 xl:px-32 lg:px-20 disabled:hover">
                {t("mypage.account.change")}
              </button>
            ))
          : (isInputCompleted && (
              <button
                className="xl:h-56 lg:h-48 border border-solid bg-primary-200 rounded-8 text-primary-500 xl:text-18 lg:text-16 font-semibold leading-24 xl:px-32 lg:px-20"
                onClick={onClickRegisterButton}
              >
                {t("mypage.account.register")}
              </button>
            )) ||
            (!isInputCompleted && (
              <button className="xl:h-56 lg:h-48 border border-solid bg-primary-100 rounded-8 text-primary-300 xl:text-18 lg:text-16 font-semibold leading-24 xl:px-32 lg:px-20 disabled:hover">
                {t("mypage.account.register")}
              </button>
            ))}
      </div>
    </div>
  );
};
export default MypageAccountCard;
