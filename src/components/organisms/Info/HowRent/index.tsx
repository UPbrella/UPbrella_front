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
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row max-w-700 xl:h-520 xl:px-0">
        <div className="flex flex-col mt-48 xl:mt-194">
          <InformTitle stepTitle="STEP 1" title="가까운 협업 지점 방문하기" />
          <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
            홈페이지 '대여소 위치'페이지 내 가장 가까운 협업 지점 방문하기 <br />※ 교외 지점의 경우
            반드시 영업시간을 확인해주세요!
          </div>
        </div>
        <img src={rental_step1} className="w-240 h-394 mt-126 lg:mt-40 lg:mx-auto" />
      </section>

      <div className="flex justify-center w-full bg-primary-100">
        <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row-reverse max-w-700 xl:h-520 xl:px-0">
          <div className="flex flex-col xl:mt-230 mt-80">
            <InformTitle stepTitle="STEP 2" title="우산 손잡이 상단 혹은 측면의 QR코드 스캔" />
          </div>
          <img
            src={rental_step2}
            className="mx-auto xl:w-440 xl:h-332 xl:mt-188 mt-69 w-280 h-211"
          />
        </section>
      </div>
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row max-w-700 xl:h-520">
        <div className="flex flex-col mt-80 xl:mt-206">
          <InformTitle stepTitle="STEP 3" title="카카오 로그인 & 대여폼 자동완성" />
          <div className="pt-24 text-gray-600 text-15 xl:text-16">
            카카오 로그인하면, 대여할 우산 정보가 자동완성됩니다 :)
          </div>
        </div>
        <div className="flex mt-40 gap-x-4 xl:mt-95">
          <img src={rental_step3} className="hidden w-240 h-425 xl:block" />
          <img src={rental_step3_2} className="mx-auto w-240 h-425" />
        </div>
      </section>
      <div className="flex justify-center w-full bg-primary-100">
        <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row-reverse max-w-700 xl:h-520">
          <div className="flex flex-col xl:mt-194 mt-80">
            <InformTitle stepTitle="STEP 4" title="업브렐라 계좌 복사 후 보증금 1만원 이체!" />
            <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
              2주 이내에 정상적으로 반납해주시면 보증금을 다시 돌려드려요! <br />
              무료로 공유 우산 대여하며 지갑도 지키고, 환경도 지키고!
            </div>
          </div>
          <img src={rental_step4} className="mx-auto mt-40 w-240 h-425 xl:mt-95" />
        </section>
      </div>
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row max-w-700 xl:h-520">
        <div className="flex flex-col xl:mt-194 mt-80">
          <InformTitle stepTitle="STEP 5" title="우산 대여 완료!" />
          <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
            다음 이용자분들을 위해 사용 후 빠르게 반납 부탁드립니다 😊 <br /> 원활한 서비스 운영을
            위해 최대 대여 기간은 14일로 한정하고 있습니다.
          </div>
        </div>
        <img src={rental_step5} className="mx-auto mt-40 w-280 h-395 xl:mt-125" />
      </section>
    </div>
  );
};

export default HowRent;
