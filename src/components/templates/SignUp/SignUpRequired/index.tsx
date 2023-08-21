import SignUpProgress from "@/components/molecules/SignUp/SignUpProgress";
import SignUpText from "@/components/molecules/SignUp/SignUpText";
import SignUpInputBox from "@/components/molecules/SignUp/SignUpInputBox";
import SignUpAllAllowBox from "@/components/molecules/SignUp/SignUpAllAllowBox";
import SignUpAllowBox from "@/components/molecules/SignUp/SignUpAllowBox";
import SignUpFormButton from "@/components/atoms/SignUp/SignUpFormButton";

export type SignUpRequiredFormProps = {
  name: string;
  phone: string;
  isAllAllow?: boolean;
  isFirstAllow?: boolean;
  isSecondAllow?: boolean;
  isFirstClicked?: boolean;
  ifSecondClicked?: boolean;
  isDone?: boolean;
};

const SignUpRequiredForm = ({
  name,
  phone,
  isAllAllow,
  isFirstAllow,
  isSecondAllow,
  isFirstClicked,
  ifSecondClicked,
  isDone,
}: SignUpRequiredFormProps) => {
  return (
    <main className="flex flex-1 flex-col justify-center items-center bg-basic">
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
              <SignUpInputBox labelTitle="이름" labelInput="이름입력" name={name} />
            </div>
            <div>
              <SignUpInputBox labelTitle="전화번호" labelInput="010-1234-5678" name={phone} />
            </div>
          </section>
          <section>
            <SignUpAllAllowBox isAllow={isAllAllow} label="전체동의" />
            <div className="my-4">
              <SignUpAllowBox
                isAllow={isFirstAllow}
                label="(필수) 업브렐라 이용약관"
                isClicked={isFirstClicked}
              />
            </div>
            <div className="mb-24">
              <SignUpAllowBox
                isAllow={isSecondAllow}
                label="(필수) 개인정보 수집 및 이용동의"
                isClicked={ifSecondClicked}
              />
            </div>
            <SignUpFormButton label="다음" isDone={isDone} />
          </section>
        </section>
      </article>
    </main>
  );
};

export default SignUpRequiredForm;
