import InformTitle from "@/components/atoms/InformTitle";
import rental_step1 from "@/assets/Rental/rental_step1.png";
import rental_step3 from "@/assets/Rental/rental_step3.png";
import return_step2 from "@/assets/Return/return_step2.png";
import return_step3 from "@/assets/Return/return_step3.png";
import return_step4 from "@/assets/Return/return_step4.png";
import return_step5 from "@/assets/Return/return_step5.png";

const HowReturn = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row xl:justify-center max-w-700 xl:h-520">
        <div className="flex flex-col mt-48 xl:mt-194">
          <InformTitle stepTitle="STEP 1" title="가까운 협업 지점 방문하기" />
          <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
            홈페이지 '대여소 위치'페이지 내 가장 가까운 협업 지점 방문하기 <br />※ 대여한 지점이
            아닌 다른 지점에서도 반납 가능해요!
          </div>
        </div>
        <img src={rental_step1} className="mx-auto mt-40 w-240 h-394 xl:mt-126" />
      </section>
      <div className="flex justify-center w-full bg-primary-100">
        <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row-reverse max-w-700 xl:h-520 xl:px-0">
          <div className="flex flex-col xl:mt-206 mt-80">
            <InformTitle stepTitle="STEP 2" title="우산 반납" />
            <div className="pt-24 text-gray-600">우산을 먼저 우산 보관함에 반납해주세요!</div>
          </div>
          <img
            src={return_step2}
            className="w-360 h-400 mt-96 lg:mt-49 lg:mx-auto lg:w-280 lg:h-311"
          />
        </section>
      </div>
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row-reverse max-w-700 xl:h-520 xl:px-0">
        <div className="flex flex-col xl:mt-206 mt-80">
          <InformTitle stepTitle="STEP 3" title="우산 보관함 혹은 보관대 옆 가판대 QR 스캔" />
          <div className="pt-24 text-gray-600">
            반납폼 제출까지 완료해주셔야 보증급 환급이 가능해요!
          </div>
        </div>
        <img src={return_step3} className="mx-auto w-347 h-320 xl:mt-200 mt-62" />
      </section>
      <div className="flex justify-center w-full bg-primary-100">
        <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row-reverse max-w-700 xl:p-0">
          <div className="flex flex-col xl:mt-194 mt-80">
            <InformTitle stepTitle="STEP 4" title="카카오 로그인 & 반납폼 자동완성" />
            <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
              카카오 로그인을 하면, 반납할 우산 정보가 자동완성됩니다 :) <br />
              환급받을 계좌는 한 번 더 확인해주세요!
            </div>
          </div>
          <div className="flex mx-auto mt-40 gap-x-4 xl:mt-95">
            <img src={rental_step3} className="hidden w-240 h-425 xl:block" />
            <img src={return_step4} className="w-240 h-425" />
          </div>
        </section>
      </div>
      <section className="flex flex-col justify-center w-full gap-10 px-40 xl:flex-row max-w-700 xl:h-520 xl:p-0">
        <div className="flex flex-col xl:mt-194 mt-80">
          <InformTitle stepTitle="STEP 5" title="담당자 확인 후 보증급 환급 완료!" />
          <div className="pt-24 text-gray-600 whitespace-pre-line text-15 xl:text-16">
            보증금 환급은 평균적으로 2 ~ 3일이 소요됩니다 😊 <br /> 갑작스러운 우천 시엔
            대여-반납량이 많아 조금 더 소요될 수 있는 점 양해 부탁드려요!
          </div>
        </div>
        <img src={return_step5} className="mx-auto mt-40 w-280 h-418 xl:mt-102" />
      </section>
    </div>
  );
};

export default HowReturn;
