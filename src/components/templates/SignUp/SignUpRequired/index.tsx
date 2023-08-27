import SignUpProgress from "@/components/molecules/SignUp/SignUpProgress";
import SignUpText from "@/components/molecules/SignUp/SignUpText";
import SignUpInputBox from "@/components/molecules/SignUp/SignUpInputBox";
import SignUpAllAllowBox from "@/components/molecules/SignUp/SignUpAllAllowBox";
import SignUpAllowBox from "@/components/molecules/SignUp/SignUpAllowBox";
import SignUpFormButton from "@/components/atoms/SignUp/SignUpFormButton";
import { ChangeEvent } from "react";

export type SignUpRequiredFormProps = {
  name: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  phone: string;
  isAllAllow?: boolean;
  onClickAllAllow: () => void;
  isFirstAllow?: boolean;
  onClickFirstAllow: () => void;
  onClickSecondAllow: () => void;
  isSecondAllow?: boolean;
  isFirstClicked?: boolean;
  isSecondClicked?: boolean;
  isDone?: boolean;
  onClickButton?: () => void;
};

const SignUpRequiredForm = ({
  name,
  onChangeValue,
  phone,
  isAllAllow,
  isFirstAllow,
  onClickAllAllow,
  isSecondAllow,
  onClickFirstAllow,
  onClickSecondAllow,
  isFirstClicked,
  isSecondClicked,
  isDone,
  onClickButton,
}: SignUpRequiredFormProps) => {
  return (
    <main className="flex flex-1 flex-col justify-center items-center">
      <article className="flex flex-1 flex-col justify-center items-center w-440 max-h-640 p-20">
        <SignUpProgress isInProgress1={true} isInProgress2={false} />
        <section className="flex flex-1 flex-col justify-between mt-40">
          <section>
            <div className="mb-28">
              <SignUpText
                labelTitle="이름과 전화번호를 입력해주세요!"
                labelSubtitle1="수집된 개인정보는"
                labelSubtitleBold="서비스 운영의 목적으로만"
                labelSubtitle2="사용됩니다."
              />
            </div>
            <div className="mb-16">
              <SignUpInputBox
                labelTitle="이름"
                labelInput="이름입력"
                name="name"
                value={name}
                onChangeValue={onChangeValue}
              />
            </div>
            <div>
              <SignUpInputBox
                labelTitle="전화번호"
                labelInput="010-1234-5678"
                name="phone"
                value={phone}
                onChangeValue={onChangeValue}
              />
            </div>
          </section>
          <section>
            <SignUpAllAllowBox
              isAllow={isAllAllow}
              onClickAllow={onClickAllAllow}
              label="전체동의"
            />
            <div className="my-4">
              <SignUpAllowBox
                isAllow={isFirstAllow}
                onClickAllow={onClickFirstAllow}
                label="(필수) 업브렐라 이용약관"
                isClicked={isFirstClicked}
              />
            </div>
            <div className="mb-24">
              <SignUpAllowBox
                isAllow={isSecondAllow}
                onClickAllow={onClickSecondAllow}
                label="(필수) 개인정보 수집 및 이용동의"
                isClicked={isSecondClicked}
              />
            </div>
            <SignUpFormButton label="다음" isDone={isDone} onClick={onClickButton} />
          </section>
        </section>
      </article>
    </main>
  );
};

export default SignUpRequiredForm;
