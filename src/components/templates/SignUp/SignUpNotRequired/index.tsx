import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SignUpProgress from "@/components/molecules/SignUp/SignUpProgress";
import SignUpText from "@/components/molecules/SignUp/SignUpText";
import SignUpFormButton from "@/components/atoms/SignUp/SignUpFormButton";
import SignUpInputAccountBox from "@/components/molecules/SignUp/SignUpInputAccountBox";
import { ChangeEvent } from "react";

export type SignUpNotRequiredFormProps = {
  bank: string;
  account: string;
  handleBackClick?: () => void;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickButton?: () => void;
};

const SignUpNotRequiredForm = ({
  bank,
  account,
  handleBackClick,
  onChangeValue,
  onClickButton,
}: SignUpNotRequiredFormProps) => {
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
                account={account}
                onChangeValue={onChangeValue}
              />
            </div>
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
