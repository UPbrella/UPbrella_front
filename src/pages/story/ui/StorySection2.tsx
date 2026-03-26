import styled from "@emotion/styled";

const StorySection2 = () => {
  return (
    <section className="mt-80">
      <CssBackgroundGradient className="rounded-[32px] text-center py-80 lg:py-40 mx-40 px-16 xl:px-32 md:mx-0 flex flex-col items-center justify-center gap-[64px] lg:gap-[32px]">
        <div className="font-semibold text-gray-700 text-h32 lg:text-h24 flex flex-col gap-[4px]">
          <div>쉽게 판매되고 쉽게 망가지는</div>
          <div>
            <span className="text-primary-700">비닐 우산은</span> 대부분 매립·소각돼
          </div>
          <div>
            <span className="text-primary-700">온실가스</span>를 발생시켜요.
          </div>
        </div>
        <div className="w-[760px] flex gap-[40px] lg:flex-col lg:w-full">
          <WhiteBox header={"국내 연간 우산 판매량"} content={"약 5,000만 개"} />
          <WhiteBox header={"서울시 1개 구 기준 1주간 버려지는 우산의 양"} content={"약 1톤"} />
        </div>
      </CssBackgroundGradient>
    </section>
  );
};

const WhiteBox = ({ header, content }: { header: string; content: string }) => {
  return (
    <div className="flex-1 flex flex-col gap-[16px]">
      <div className="font-semibold text-gray-600 text-h18 lg:text-h16">{header}</div>
      <div className="font-semibold text-h36 lg:text-h26 p-40 bg-white rounded-[20px] text-black">
        {content}
      </div>
    </div>
  );
};

const CssBackgroundGradient = styled.div`
  background: linear-gradient(106deg, #fef4f2 17.24%, #e8f4ff 83.06%);
`;

export default StorySection2;
