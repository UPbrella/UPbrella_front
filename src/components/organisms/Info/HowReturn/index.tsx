import InformTitle from "@/components/atoms/InformTitle";
import rental_step1 from "@/assets/Rental/rental_step1.png";
import rental_step3 from "@/assets/Rental/rental_step3.png";
import return_step2 from "@/assets/Return/return_step2.png";
import return_step3 from "@/assets/Return/return_step3.png";
import return_step4 from "@/assets/Return/return_step4.png";
import return_step5 from "@/assets/Return/return_step5.png";

const HowReturn = () => {
  return (
    <>
      <section className="flex justify-center w-full gap-10" style={{ height: "520px" }}>
        <div className="flex flex-col pt-194">
          <InformTitle stepTitle="STEP 1" title="가까운 협업 지점 방문하기" />
          <div className="text-gray-600 pt-24 whitespace-pre-line	">
            홈페이지 '대여소 위치'페이지 내 가장 가까운 협업 지점 방문하기 <br />※ 대여한 지점이
            아닌 다른 지점에서도 반납 가능해요!
          </div>
        </div>
        <img src={rental_step1} className="w-240 h-394 mt-126" />
      </section>
      <section
        className="flex justify-center bg-primary-100 w-full gap-10"
        style={{ height: "520px" }}
      >
        <img src={return_step2} className="w-360 h-400 mt-96" />
        <div className="flex flex-col mt-206">
          <InformTitle stepTitle="STEP 2" title="우산 반납" />
          <div className="pt-24 text-gray-600">우산을 먼저 우산 보관함에 반납해주세요!</div>
        </div>
      </section>
      <section className="flex justify-center w-full gap-10	" style={{ height: "520px" }}>
        <div className="flex flex-col mt-206 ">
          <InformTitle stepTitle="STEP 3" title="우산 보관함 혹은 보관대 옆 가판대 QR 스캔" />
          <div className="text-gray-600 pt-24">
            반납폼 제출까지 완료해주셔야 보증급 환급이 가능해요!
          </div>
        </div>
        <img src={return_step3} className="w-347 h-320 mt-200" />
      </section>
      <section
        className="flex justify-center w-full gap-10	bg-primary-100"
        style={{ height: "520px" }}
      >
        <div className="flex gap-x-4 mt-95">
          <img src={rental_step3} className="w-240 h-425" />
          <img src={return_step4} className="w-240 h-425" />
        </div>

        <div className="flex flex-col mt-194 ">
          <InformTitle stepTitle="STEP 4" title="카카오 로그인 & 반납폼 자동완성" />
          <div className="text-gray-600 pt-24 whitespace-pre-line	">
            카카오 로그인을 하면, 반납할 우산 정보가 자동완성됩니다 :) <br />
            환급받을 계좌는 한 번 더 확인해주세요!
          </div>
        </div>
      </section>
      <section className="flex justify-center w-full gap-10	" style={{ height: "520px" }}>
        <div className="flex flex-col mt-194">
          <InformTitle stepTitle="STEP 5" title="담당자 확인 후 보증급 환급 완료!" />
          <div className="text-gray-600 pt-24 whitespace-pre-line	">
            보증금 환급은 평균적으로 2 ~ 3일이 소요됩니다 😊 <br /> 갑작스러운 우천 시엔
            대여-반납량이 많아 조금 더 소요될 수 있는 점 양해 부탁드려요!
          </div>
        </div>
        <img src={return_step5} className="w-280 h-418 mt-102" />
      </section>
    </>
  );
};

export default HowReturn;
