import SignUpNotRequiredForm from "@/components/templates/SignUp/SignUpNotRequired";
import SignUpRequiredForm from "@/components/templates/SignUp/SignUpRequired";
import { ChangeEvent, useEffect, useState } from "react";

export type TInputs = {
  name: string;
  phone: string;
  bank: string;
  account: string;
};

// export type TIsAllows = {
//   isFirstAllow: boolean;
//   isSecondAllow: boolean;
// };

// export type TIsAllows = {
//   isAllAllow: boolean;
//   isFirstAllow: boolean;
//   isSecondAllow: boolean;
// };

const SignUpPage = () => {
  const [inputs, setInputs] = useState<TInputs>({ name: "", phone: "", bank: "", account: "" });
  //   const [isAllows, setIsAllows] = useState<TIsAllows>({
  //     isAllAllow: false,
  //     isFirstAllow: false,
  //     isSecondAllow: false,
  //   });
  const [isAllAllow, setIsAllAllow] = useState(false);
  //   const [isAllows, setIsAllows] = useState<TIsAllows>({
  //     isFirstAllow: false,
  //     isSecondAllow: false,
  //   });
  const [isFirstAllow, setIsFirstAllow] = useState(false);
  const [isSecondAllow, setIsSecondAllow] = useState(false);

  //   const [isFirstClicked, setIsFirstClicked] = useState<boolean>(false);
  //   const [isSecondClicked, setIsSecondClicked] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isNext, setIsNext] = useState<boolean>(false);

  const { name, phone, bank, account } = inputs;
  //   const { isFirstAllow, isSecondAllow } = isAllows;

  useEffect(() => {
    const handleIsDone = () => {
      const status = name && phone && isFirstAllow && isSecondAllow;
      if (status) {
        setIsDone(true);
      } else {
        setIsDone(false);
      }
    };
    handleIsDone();
  }, [name, phone, isFirstAllow, isSecondAllow]);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
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
      alert("됐다.");
      setIsNext(true);
    }
  };
  const handleBackClick = () => {
    setIsNext(false);
  };

  return (
    <>
      {isNext ? (
        <SignUpNotRequiredForm
          bank={bank}
          account={account}
          handleBackClick={handleBackClick}
          onChangeValue={handleInputValue}
          onClickButton={() => alert("버튼클릭")}
        />
      ) : (
        <SignUpRequiredForm
          name={name}
          onChangeValue={handleInputValue}
          phone={phone}
          isAllAllow={isAllAllow}
          onClickAllAllow={handleIsAllAllows}
          isFirstAllow={isFirstAllow}
          isSecondAllow={isSecondAllow}
          onClickFirstAllow={handleIsFirstAllow}
          onClickSecondAllow={handleIsSecondAllow}
          // isFirstClicked={isFirstClicked}
          // isSecondClicked={isSecondClicked}
          isDone={isDone}
          onClickButton={onClickButton}
        />
      )}
    </>
  );
};
export default SignUpPage;
