import BottomSheet from "@/shared/ui/BottomSheet";
import BankContent from "@/features/rent-form/ui/BankContent";
import SignUpFormButton from "@/features/auth/ui/SignUpFormButton";
import SignUpInputAccountBox from "@/features/auth/ui/SignUpInputAccountBox";
import SignUpProgress from "@/features/auth/ui/SignUpProgress";
import SignUpText from "@/features/auth/ui/SignUpText";
import BankModal from "@/shared/ui/BankModal";
import { BANKS } from "@/shared/constants/bank-icons";
import { getBankDisplayName } from "@/shared/constants/bank-icons";
import { SignUpNotRequiredFormProps } from "@/features/auth/model/signup-types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useTranslation } from "react-i18next";

const SignUpNotRequiredForm = ({
  register,
  watch,
  handleBackClick,
  onClickBankArrow,
  onClickButton,
  isOpenModal,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  setBank,
  handleClose,
  bankRef,
  onAccountNumberChange,
}: SignUpNotRequiredFormProps) => {
  const { t } = useTranslation();
  const bank = watch("bank") || "";
  const accountNumber = watch("accountNumber") || "";

  return (
    <main className="flex flex-col flex-1 items-center">
      <article className="flex flex-col flex-1 justify-center items-center p-20 xl:h-760 xl:max-w-440 xl:w-full lg:max-w-640 lg:w-full md:w-full lg:max-h-720">
        <div className="flex justify-between w-full">
          <ChevronLeftIcon onClick={handleBackClick} />
          <div className="flex justify-center w-full">
            <SignUpProgress isInProgress1={false} isInProgress2={true} />
          </div>
          <div className="min-h-24 min-w-24" />
        </div>
        <section className="flex flex-col flex-1 justify-between mt-40 w-full">
          <section className="w-full">
            <div className="mb-28">
              <SignUpText
                labelTitle={t("auth.signup.step2.title")}
                labelSubtitle1={t("auth.signup.step2.desc1")}
                labelSubtitleNextLine={t("auth.signup.step2.desc2")}
              />
            </div>
            <div>
              <SignUpInputAccountBox
                labelTitle={t("auth.signup.step2.accountLabel")}
                labelInput={t("auth.signup.step2.accountPlaceholder")}
                bank={getBankDisplayName(bank, t)}
                accountNumber={accountNumber}
                accountNumberRegistration={register("accountNumber")}
                onChangeValue={(e) => onAccountNumberChange?.(e.target.value)}
                onClick={onClickBankArrow}
                bankRef={bankRef}
              />
            </div>
            {window.innerWidth > 1025 ? (
              <BankModal
                titleText={t("auth.signup.step2.selectBank")}
                isOpen={isOpenModal}
                handleClose={handleClose}
                children={
                  <div className="grid grid-cols-3 gap-4">
                    {BANKS.map(({ apiKey, labelKey, icon }) => (
                      <div key={apiKey}>
                        <div
                          className="flex flex-col justify-center items-center p-12 mb-8 w-full cursor-pointer"
                          onClick={() => {
                            setBank(apiKey);
                            handleClose();
                          }}
                        >
                          <div className="w-24 h-24">
                            <img src={icon} alt={t(labelKey)} />
                          </div>
                          <div className="mt-4 text-gray-700 text-15 leading-22">{t(labelKey)}</div>
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
          </section>
          <section>
            <SignUpFormButton
              label={t("auth.signup.step2.submit")}
              isDone={true}
              onClick={onClickButton}
            />
          </section>
        </section>
      </article>
    </main>
  );
};

export default SignUpNotRequiredForm;
