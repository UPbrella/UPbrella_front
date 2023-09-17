import MypageFormContent from "@/components/atoms/Mypage/MypageFormContent";
import MypageFormTitle from "@/components/atoms/Mypage/MypageFormTitle";

export type MypageInfoSectionProps = {
  name: string;
  phoneNumber: string;
  email: string;
};

const MypageInfoSection = ({ name, phoneNumber, email }: MypageInfoSectionProps) => {
  return (
    <section className="p-24 border border-solid border-gray-200 rounded-12">
      <div className="flex flex-col">
        <div className="flex mb-24">
          <div className="mr-24">
            <MypageFormTitle label="이름" />
          </div>
          <div className="">
            <MypageFormContent label={name} />
          </div>
        </div>
        <div className="flex mb-24">
          <div className="mr-24">
            <MypageFormTitle label="전화번호" />
          </div>
          <div className="">
            <MypageFormContent label={phoneNumber} />
          </div>
        </div>
        <div className="flex">
          <div className="mr-24">
            <MypageFormTitle label="이메일" />
          </div>
          <div className="">
            <MypageFormContent label={email} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default MypageInfoSection;
