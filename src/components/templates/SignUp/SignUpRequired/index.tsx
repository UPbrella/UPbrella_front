import SignUpFormButton from "@/components/atoms/SignUp/SignUpFormButton";
import SignUpAllAllowBox from "@/components/molecules/SignUp/SignUpAllAllowBox";
import SignUpAllowBox from "@/components/molecules/SignUp/SignUpAllowBox";
import SignUpInputBox from "@/components/molecules/SignUp/SignUpInputBox";
import SignUpProgress from "@/components/molecules/SignUp/SignUpProgress";
import SignUpText from "@/components/molecules/SignUp/SignUpText";
import { SignUpRequiredFormProps } from "@/types/signup/SignupTypes";
import { Controller } from "react-hook-form";

const SignUpRequiredForm = ({
  register,
  control,
  errors,
  watch,
  isValid,
  onClickButton,
  onClickDetailTOSPage,
  onClickDetailPPPage,
  onPhoneNumberChange,
}: SignUpRequiredFormProps) => {
  return (
    <main className="flex flex-col items-center flex-1">
      <article className="flex flex-col items-center justify-center flex-1 p-20 xl:h-760 xl:max-w-440 xl:w-full lg:max-w-640 lg:w-full md:w-full lg:max-h-720">
        <SignUpProgress isInProgress1={true} isInProgress2={false} />
        <section className="flex flex-col justify-between flex-1 w-full mt-40">
          <section className="w-full">
            <div className="mb-28">
              <SignUpText
                labelTitle="전화번호를 입력해주세요!"
                labelSubtitle1="수집된 개인정보는"
                labelSubtitleBold="서비스 운영의 목적으로만"
                labelSubtitle2="사용됩니다."
              />
            </div>
            <div className="mb-16">
              <SignUpInputBox
                labelTitle="이름"
                labelInput="이름입력"
                registration={register("name")}
                value={watch("name")}
                error={errors.name?.message}
                isRequired={true}
              />
            </div>
            <div>
              <SignUpInputBox
                labelTitle="전화번호"
                labelInput="010-1234-5678"
                registration={register("phoneNumber")}
                value={watch("phoneNumber") || ""}
                error={errors.phoneNumber?.message}
                onChange={(e) => onPhoneNumberChange?.(e.target.value)}
              />
            </div>
          </section>
          <section className="mt-32">
            <Controller
              name="termsOfService"
              control={control}
              render={({ field: { value: tosValue, onChange: tosOnChange } }) => (
                <Controller
                  name="privacyPolicy"
                  control={control}
                  render={({ field: { value: ppValue, onChange: ppOnChange } }) => (
                    <>
                      <SignUpAllAllowBox
                        isAllow={Boolean(tosValue && ppValue)}
                        onClickAllow={() => {
                          const newStatus = !(tosValue && ppValue);
                          tosOnChange(newStatus);
                          ppOnChange(newStatus);
                        }}
                        label="전체동의"
                      />
                      <div className="my-4">
                        <SignUpAllowBox
                          isAllow={Boolean(tosValue)}
                          onClickAllow={() => tosOnChange(!tosValue)}
                          label="(필수) 업브렐라 이용약관"
                          onClickDetailPage={onClickDetailTOSPage}
                        />
                      </div>
                      <div className="mb-24">
                        <SignUpAllowBox
                          isAllow={Boolean(ppValue)}
                          onClickAllow={() => ppOnChange(!ppValue)}
                          label="(필수) 개인정보 수집 및 이용동의"
                          onClickDetailPage={onClickDetailPPPage}
                        />
                      </div>
                    </>
                  )}
                />
              )}
            />
            <SignUpFormButton label="다음" isDone={isValid} onClick={onClickButton} />
          </section>
        </section>
      </article>
    </main>
  );
};

export default SignUpRequiredForm;
