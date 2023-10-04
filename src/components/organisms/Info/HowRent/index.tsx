import InformTitle from "@/components/atoms/InformTitle";
import rental_step1 from "@/assets/Rental/rental_step1.png";
import rental_step2 from "@/assets/Rental/rental_step2.png";
import rental_step3 from "@/assets/Rental/rental_step3.png";
import rental_step3_2 from "@/assets/Rental/rental_step3_2.png";
import rental_step4 from "@/assets/Rental/rental_step4.png";
import rental_step5 from "@/assets/Rental/rental_step5.png";
const HowRent = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-row smMaxLg:flex-col justify-center w-full gap-10 smMaxLg:max-w-700 smMaxLg:justify-center xl:h-520 smMaxLg:px-40">
        <div className="flex flex-col mt-194 smMaxLg:mt-48">
          <InformTitle stepTitle="STEP 1" title="가까운 협업 지점 방문하기" />
          <div className="text-gray-600 pt-24 whitespace-pre-line smMaxLg:text-15">
            홈페이지 '대여소 위치'페이지 내 가장 가까운 협업 지점 방문하기 <br />※ 교외 지점의 경우
            반드시 영업시간을 확인해주세요!
          </div>
        </div>
        <img src={rental_step1} className="w-240 h-394 mt-126 lg:mt-40 lg:mx-auto" />
      </section>

      <div className="bg-primary-100 w-full smMaxLg:flex smMaxLg:justify-center">
        <section className="flex flex-row-reverse smMaxLg:flex-col justify-center w-full gap-10 smMaxLg:max-w-700 xl:h-520 smMaxLg:px-40">
          <div className="flex flex-col mt-230 smMaxLg:mt-80">
            <InformTitle stepTitle="STEP 2" title="우산 손잡이 상단 혹은 측면의 QR코드 스캔" />
          </div>
          <img
            src={rental_step2}
            className="w-440 h-332 mt-188 smMaxLg:mt-69 smMaxLg:mx-auto smMaxLg:w-280 smMaxLg:h-211"
          />
        </section>
      </div>
      <section className="flex flex-row smMaxLg:flex-col justify-center w-full gap-10 smMaxLg:max-w-700 xl:h-520 smMaxLg:px-40">
        <div className="flex flex-col mt-206 smMaxLg:mt-80">
          <InformTitle stepTitle="STEP 3" title="카카오 로그인 & 대여폼 자동완성" />
          <div className="text-gray-600 pt-24 smMaxLg::text-15">
            카카오 로그인하면, 대여할 우산 정보가 자동완성됩니다 :)
          </div>
        </div>
        <div className="flex gap-x-4 mt-95 smMaxLg::mt-40">
          <img src={rental_step3} className="w-240 h-425 smMaxLg::hidden" />
          <img src={rental_step3_2} className="w-240 h-425 smMaxLg::mx-auto" />
        </div>
      </section>
      <div className="bg-primary-100 w-full smMaxLg:flex smMaxLg:justify-center">
        <section className="flex flex-row-reverse smMaxLg:flex-col justify-center w-full gap-10 smMaxLg:max-w-700 xl:h-520 smMaxLg:px-40">
          <div className="flex flex-col mt-194 smMaxLg::mt-80">
            <InformTitle stepTitle="STEP 4" title="업브렐라 계좌 복사 후 보증금 1만원 이체!" />
            <div className="text-gray-600 pt-24 whitespace-pre-line	smMaxLg:text-15">
              2주 이내에 정상적으로 반납해주시면 보증금을 다시 돌려드려요! <br />
              무료로 공유 우산 대여하며 지갑도 지키고, 환경도 지키고!
            </div>
          </div>
          <img src={rental_step4} className="w-240 h-425 mt-95 smMaxLg:mt-40 smMaxLg:mx-auto" />
        </section>
      </div>
      <section className="flex flex-row smMaxLg:flex-col justify-center w-full gap-10 smMaxLg:max-w-700 xl:h-520 smMaxLg:px-40">
        <div className="flex flex-col mt-194 smMaxLg:mt-80">
          <InformTitle stepTitle="STEP 5" title="우산 대여 완료!" />
          <div className="text-gray-600 pt-24 whitespace-pre-line	smMaxLg:text-15">
            다음 이용자분들을 위해 사용 후 빠르게 반납 부탁드립니다 😊 <br /> 원활한 서비스 운영을
            위해 최대 대여 기간은 14일로 한정하고 있습니다.
          </div>
        </div>
        <img src={rental_step5} className="w-280 h-395 mt-125 smMaxLg:mt-40 smMaxLg:mx-auto" />
      </section>
    </div>
  );
};

export default HowRent;
