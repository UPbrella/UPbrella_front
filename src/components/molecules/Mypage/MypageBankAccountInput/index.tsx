import MypageBankInput from "@/components/atoms/Mypage/MypageBankInput";
import MypageFormTitle from "@/components/atoms/Mypage/MypageFormTitle";
import SignUpFormInput from "@/components/atoms/SignUp/SignUpFormInput";
import { ChangeEvent } from "react";

export type MypageBankAccountInputProps = {
  bank: string;
  accountNumber: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  bankRef: React.RefObject<HTMLInputElement>;
};

const MypageBankAccountInput = ({
  bank,
  accountNumber,
  onChangeValue,
  onClick,
  bankRef,
}: MypageBankAccountInputProps) => {
  return (
    <section className="p-24 border border-solid border-gray-200 rounded-12">
      <div className="flex flex-col">
        <div className="flex mb-8 items-center">
          <div className="mr-40">
            <MypageFormTitle label="은행" />
          </div>
          <div className="mr-4">
            <MypageBankInput
              label="은행명"
              name="bank"
              value={bank}
              onChange={onChangeValue}
              onClick={onClick}
              bankRef={bankRef}
            />
          </div>
        </div>
        <div className="flex mb-4 items-center">
          <div className="mr-40">
            <MypageFormTitle label="계좌번호" />
          </div>
          <div className="w-224">
            <SignUpFormInput
              label="계좌번호"
              name="accountNumber"
              value={accountNumber}
              onChange={onChangeValue}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-40">
            <MypageFormTitle label="" />
          </div>
          <div className="text-gray-600 text-14 font-normal leading-20 mt-4">
            * ‘-’은 빼고 입력해주세요!
          </div>
        </div>
      </div>
    </section>
  );
};

export default MypageBankAccountInput;
