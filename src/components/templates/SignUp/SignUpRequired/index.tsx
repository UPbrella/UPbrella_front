import SignUpProgress from "@/components/molecules/SignUp/SignUpProgress";
import SignUpText from "@/components/molecules/SignUp/SignUpText";
import SignUpInputBox from "@/components/molecules/SignUp/SignUpInputBox";
import SignUpAllAllowBox from "@/components/molecules/SignUp/SignUpAllAllowBox";
import SignUpAllowBox from "@/components/molecules/SignUp/SignUpAllowBox";
import SignUpFormButton from "@/components/atoms/SignUp/SignUpFormButton";
import Footer from "@/components/organisms/Footer";
import { SignUpRequiredFormProps } from "@/types/signup/SignupTypes";

const SignUpRequiredForm = ({
  name,
  onChangeValue,
  phoneNumber,
  isNameValid,
  isPhoneNumberValid,
  isAllAllow,
  isFirstAllow,
  onClickAllAllow,
  isSecondAllow,
  onClickFirstAllow,
  onClickSecondAllow,
  isDone,
  onClickButton,
  onClickDetailTOSPage,
  onClickDetailPPPage,
}: SignUpRequiredFormProps) => {
  return (
    <main className="flex flex-1 flex-col items-center">
      <article className="flex flex-1 flex-col justify-center items-center max-h-760 xl:max-w-440 xl:w-full lg:max-w-640 lg:w-full md:w-full p-20">
        <SignUpProgress isInProgress1={true} isInProgress2={false} />
        <section className="flex flex-1 flex-col justify-between mt-40 w-full">
          <section className="w-full">
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
                isValid={isNameValid}
                validLabel={"국문, 영문만 입력 가능합니다."}
              />
            </div>
            <div>
              <SignUpInputBox
                labelTitle="전화번호"
                labelInput="010-1234-5678"
                name="phoneNumber"
                value={phoneNumber}
                onChangeValue={onChangeValue}
                isValid={isPhoneNumberValid}
                validLabel={"010 뒤 8자리를 입력해주세요."}
              />
            </div>
          </section>
          <section className="mt-32">
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
                onClickDetailPage={onClickDetailTOSPage}
              />
            </div>
            <div className="mb-24">
              <SignUpAllowBox
                isAllow={isSecondAllow}
                onClickAllow={onClickSecondAllow}
                label="(필수) 개인정보 수집 및 이용동의"
                onClickDetailPage={onClickDetailPPPage}
              />
            </div>
            <SignUpFormButton label="다음" isDone={isDone} onClick={onClickButton} />
          </section>
        </section>
      </article>
      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
};

export default SignUpRequiredForm;
