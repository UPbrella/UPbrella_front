import SignUpNotRequiredForm from "@/components/templates/SignUp/SignUpNotRequired";
import SignUpRequiredForm from "@/components/templates/SignUp/SignUpRequired";
import { formatPhoneNumber, validateNumber } from "@/utils/utils";
import { MouseEvent, ChangeEvent, useEffect, useState, useRef } from "react";
import { useUpbrellaSignUp, useGetSocialSession } from "@/hooks/queries/userQueries";
import { TInputs } from "@/types/signup/SignupTypes";
import SeoMetaTag from "@/utils/SeoMetaTag";

const SignUpPage = () => {
  const [inputs, setInputs] = useState<TInputs>({
    name: "",
    phoneNumber: "",
    email: "",
    bank: "",
    accountNumber: "",
  });

  const { data: socialSession } = useGetSocialSession();
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isAllAllow, setIsAllAllow] = useState(false);
  const [isFirstAllow, setIsFirstAllow] = useState(false);
  const [isSecondAllow, setIsSecondAllow] = useState(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const bankInput = useRef<HTMLInputElement>(null);

  const { name, phoneNumber, bank, accountNumber } = inputs;

  const { mutate: signUpMutate } = useUpbrellaSignUp();

  // 애플 로그인 여부 확인
  const isAppleLogin = socialSession?.data?.data?.provider === "apple";

  // 애플 로그인에서 받은 이름 (placeholder로 사용)
  const appleName =
    isAppleLogin && socialSession?.data?.data?.name && socialSession.data.data.name.trim() !== ""
      ? socialSession.data.data.name
      : "";

  // 소셜 로그인 세션에서 이메일 자동 채우기
  useEffect(() => {
    if (socialSession?.data?.data) {
      const { email: sessionEmail } = socialSession.data.data;

      setInputs((prev) => ({
        ...prev,
        email: sessionEmail && sessionEmail.trim() !== "" ? sessionEmail : prev.email,
      }));
    }
  }, [socialSession]);

  useEffect(() => {
    const handleNameValid = () => {
      // 애플 로그인이고 이름이 비어있지만 appleName이 있으면 유효
      if (isAppleLogin && !name && appleName) {
        setIsNameValid(true);
        return;
      }
      // 이름이 입력되었으면 검증
      if (!!name && !/^[가-힣a-zA-Z]{2,6}$/.test(name)) {
        setIsNameValid(false);
      } else {
        setIsNameValid(true);
      }
    };
    const handlePhoneNumberValid = () => {
      if (!!phoneNumber && phoneNumber.length < 13) {
        setIsPhoneNumberValid(false);
      } else {
        setIsPhoneNumberValid(true);
      }
    };
    // 애플 로그인이고 appleName이 있으면 name이 비어있어도 통과
    const isNameRequired = isAppleLogin && appleName ? true : !!name;
    const isPass =
      isNameRequired &&
      !!phoneNumber &&
      isNameValid &&
      isPhoneNumberValid &&
      isFirstAllow &&
      isSecondAllow;
    setIsDone(isPass);
    handleNameValid();
    handlePhoneNumberValid();
  }, [
    name,
    phoneNumber,
    isNameValid,
    isPhoneNumberValid,
    isFirstAllow,
    isSecondAllow,
    isAppleLogin,
    appleName,
  ]);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "accountNumber") {
      if (validateNumber(value)) {
        setInputs({ ...inputs, [name]: value });
      }
      return;
    }

    if (name === "phoneNumber") {
      const phoneValue = formatPhoneNumber(value);
      setInputs({ ...inputs, [name]: phoneValue });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleIsAllAllows = () => {
    const status = !isAllAllow;
    setIsAllAllow(status);
    setIsFirstAllow(status);
    setIsSecondAllow(status);
  };

  const handleIsFirstAllow = () => {
    const status = !isFirstAllow;
    if (status) {
      setIsFirstAllow(status);
    } else {
      setIsFirstAllow(status);
      setIsAllAllow(status);
    }
  };
  const handleIsSecondAllow = () => {
    const status = !isSecondAllow;
    if (status) {
      setIsSecondAllow(status);
    } else {
      setIsSecondAllow(status);
      setIsAllAllow(status);
    }
  };

  const onClickButton = () => {
    if (isDone) {
      setIsNext(true);
    }
  };
  const handleBackClick = () => {
    setIsNext(false);
  };

  const onClickBankArrow = () => {
    setIsOpenModal(!isOpenModal);
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const handleClickBank = (event: MouseEvent<HTMLDivElement>) => {
    const bankName = event.currentTarget.textContent; // 선택한 은행의 이름을 가져옴
    if (bankInput.current) {
      setInputs({ ...inputs, [bankInput.current.name]: bankName });
      setIsOpenModal(!isOpenModal);
    }
  };
  const setBank = (value: string) => {
    setInputs({ ...inputs, bank: value });
  };
  const handleClose = () => {
    setIsOpenModal(!isOpenModal);
  };

  const onSubmitButton = () => {
    // 애플 로그인이고 이름이 비어있으면 appleName 사용
    const finalInputs = {
      ...inputs,
      name: name || appleName,
    };
    signUpMutate(finalInputs);
  };

  return (
    <>
      <SeoMetaTag
        title={"회원가입"}
        description={"업브렐라 서비스 이용을 위한 회원가입 페이지입니다."}
        keywords={", 회원가입, sign up"}
      />
      {isNext ? (
        <SignUpNotRequiredForm
          bank={bank}
          accountNumber={accountNumber}
          handleBackClick={handleBackClick}
          onChangeValue={handleInputValue}
          onClickBankArrow={onClickBankArrow}
          isOpenModal={isOpenModal}
          isBottomSheetOpen={isBottomSheetOpen}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
          setBank={setBank}
          handleClose={handleClose}
          handleClickBank={handleClickBank}
          onClickButton={onSubmitButton}
          bankRef={bankInput}
        />
      ) : (
        <SignUpRequiredForm
          name={name}
          namePlaceholder={appleName}
          onChangeValue={handleInputValue}
          phoneNumber={phoneNumber}
          isNameValid={isNameValid}
          isPhoneNumberValid={isPhoneNumberValid}
          isAllAllow={isAllAllow}
          onClickAllAllow={handleIsAllAllows}
          isFirstAllow={isFirstAllow}
          isSecondAllow={isSecondAllow}
          onClickFirstAllow={handleIsFirstAllow}
          onClickSecondAllow={handleIsSecondAllow}
          onClickDetailTOSPage={() => {
            const url = `${window.location.origin}/info/tos`;
            window.open(url, "_blank", "noopener, noreferrer");
          }}
          onClickDetailPPPage={() => {
            const url = `${window.location.origin}/info/pp`;
            window.open(url, "_blank", "noopener, noreferrer");
          }}
          isDone={isDone}
          onClickButton={onClickButton}
        />
      )}
    </>
  );
};
export default SignUpPage;
