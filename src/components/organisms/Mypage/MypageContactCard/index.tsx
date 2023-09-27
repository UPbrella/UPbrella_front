import MypageContactSection from "@/components/molecules/Mypage/MypageContactSection";

const MypageContactCard = () => {
  return (
    <div className="xl:py-24 lg:pt-8 w-full">
      <div className="text-black text-32 font-semibold leading-40 mb-24 lg:hidden">문의하기</div>
      <div className="xl:flex xl:justify-between">
        <div className="w-full xl:mr-8 lg:mb-16">
          <MypageContactSection
            content1={`업브렐라 이용 관련 및 급한 문의는`}
            content2={"업브렐라 인스타그램 계정으로 부탁드려요!"}
            buttonContent="업브렐라 DM으로 문의하기"
            url={"https://www.instagram.com/upbrella.sinchon/"}
          />
        </div>
        <div className="w-full xl:ml-8">
          <MypageContactSection
            content1={`업브렐라와의 사업 제휴 관련 문의는`}
            content2={"Contact Us에서 부탁드려요!"}
            buttonContent="CONTACT US에서 문의하기"
            url={"/contact"}
          />
        </div>
      </div>
      <div className="flex justify-end mt-8"></div>
    </div>
  );
};
export default MypageContactCard;
