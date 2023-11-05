import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SignUpProgress from "@/components/molecules/SignUp/SignUpProgress";
import SignUpText from "@/components/molecules/SignUp/SignUpText";
import SignUpFormButton from "@/components/atoms/SignUp/SignUpFormButton";
import SignUpInputAccountBox from "@/components/molecules/SignUp/SignUpInputAccountBox";
import { BankIcon } from "@/constants/BankIcon";
import BankModal from "@/components/organisms/BankModal";
import BottomSheet from "@/components/atoms/BottomSheet";
import BankContent from "@/components/atoms/Form/BankContent";
import { SignUpNotRequiredFormProps } from "@/types/signup/SignupTypes";

const SignUpNotRequiredForm = ({
  bank,
  accountNumber,
  handleBackClick,
  onChangeValue,
  onClickBankArrow,
  onClickButton,
  isOpenModal,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  setBank,
  handleClose,
  handleClickBank,
  bankRef,
}: SignUpNotRequiredFormProps) => {
  const banks = Object.entries(BankIcon);

  return (
    <main className="flex flex-col items-center flex-1">
      <article className="flex flex-col items-center justify-center flex-1 p-20 xl:h-760 xl:max-w-440 xl:w-full lg:max-w-640 lg:w-full md:w-full lg:max-h-720">
        <div className="flex justify-between w-full">
          <ChevronLeftIcon onClick={handleBackClick} />
          <div className="flex justify-center w-full">
            <SignUpProgress isInProgress1={false} isInProgress2={true} />
          </div>
        </div>
        <section className="flex flex-col justify-between flex-1 w-full mt-40">
          <section className="w-full">
            <div className="mb-28">
              <SignUpText
                labelTitle="환급받을 계좌를 입력해주세요!"
                labelSubtitle1="지금 한 번 입력해두면 반납할 땐 자동 입력됩니다 :)
                "
                labelSubtitleNextLine="선택사항이니 그냥 넘어가도 좋아요!"
              />
            </div>
            <div>
              <SignUpInputAccountBox
                labelTitle="환급받을 계좌"
                labelInput="계좌번호"
                bank={bank}
                accountNumber={accountNumber}
                onChangeValue={onChangeValue}
                onClick={onClickBankArrow}
                bankRef={bankRef}
              />
            </div>
            {window.innerWidth > 1025 ? (
              <BankModal
                titleText="은행을 선택해주세요"
                isOpen={isOpenModal}
                handleClose={handleClose}
                children={
                  <div className="grid grid-cols-3 gap-4">
                    {banks.map(([bankName, icon]) => (
                      <div key={bankName}>
                        <div
                          className="flex flex-col items-center justify-center w-full p-12 mb-8 cursor-pointer"
                          onClick={handleClickBank}
                        >
                          <div className="w-24 h-24">{icon}</div>
                          <div className={`mt-4 text-15 leading-22 text-gray-700`}>{bankName}</div>
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
            <SignUpFormButton label="가입하기!" isDone={true} onClick={onClickButton} />
          </section>
        </section>
      </article>
    </main>
  );
};

export default SignUpNotRequiredForm;
