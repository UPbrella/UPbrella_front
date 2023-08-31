import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SignUpProgress from "@/components/molecules/SignUp/SignUpProgress";
import SignUpText from "@/components/molecules/SignUp/SignUpText";
import SignUpFormButton from "@/components/atoms/SignUp/SignUpFormButton";
import SignUpInputAccountBox from "@/components/molecules/SignUp/SignUpInputAccountBox";
import { ChangeEvent } from "react";
import { BankIcon } from "@/constants/BankIcon";
import { MouseEvent } from "react";
import BankModal from "@/components/organisms/BankModal";

export type SignUpNotRequiredFormProps = {
  bank: string;
  accountNumber: string;
  handleBackClick?: () => void;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickBankArrow: () => void;
  onClickButton?: () => void;
  isOpenModal: boolean;
  handleClose: () => void;
  handleClickBank: (event: MouseEvent<HTMLDivElement>) => void;
  bankRef: React.RefObject<HTMLInputElement>;
};

const SignUpNotRequiredForm = ({
  bank,
  accountNumber,
  handleBackClick,
  onChangeValue,
  onClickBankArrow,
  onClickButton,
  isOpenModal,
  handleClose,
  handleClickBank,
  bankRef,
}: SignUpNotRequiredFormProps) => {
  const banks = Object.entries(BankIcon);

  return (
    <main className="flex flex-1 flex-col justify-center items-center bg-basic">
      <article className="flex flex-1 flex-col justify-center items-center w-440 max-h-640 p-20">
        <div className="flex justify-between w-full">
          <ChevronLeftIcon onClick={handleBackClick} />
          <div className="flex justify-center w-full">
            <SignUpProgress isInProgress1={false} isInProgress2={true} />
          </div>
        </div>
        <section className="flex flex-1 flex-col justify-between mt-40">
          <section>
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
            <BankModal
              titleText="은행을 선택해주세요"
              isOpen={isOpenModal}
              handleClose={handleClose}
              children={
                <div className="grid grid-cols-3 gap-4">
                  {banks.map(([bankName, icon]) => (
                    <div key={bankName}>
                      <div
                        className="w-full mb-8 p-12 flex flex-col items-center justify-center  cursor-pointer"
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
