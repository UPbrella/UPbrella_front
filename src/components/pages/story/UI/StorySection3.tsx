import umbrellaImg from "@/assets/Story/section3.png";
import { SectionBullet } from "@/components/pages/story/UI/SectionBullet";

const StorySection3 = () => {
  return (
    <section
      className={`mt-80 py-80 lg:py-40 px-40 md:px-0 flex justify-center items-center gap-[40px]`}
    >
      <div className="flex flex-col gap-[24px] font-semibold lg:w-full">
        <header className="text-h18 lg:text-h15 text-primary-500">환경적 임팩트 창출</header>
        <div className="text-gray-700 text-h32 lg:text-h24">
          업브렐라는 The Better Choice, <br /> 더 나은 선택을 지향합니다.
        </div>

        <div className="xl:hidden">
          <img src={umbrellaImg} alt="업브렐라 이미지" className="w-full" />
        </div>

        <div className="text-gray-600 text-h18 lg:text-h15">
          업브렐라 이용으로 비닐우산 1개를 구매하지 않음으로써,
          <br className="lg:hidden" /> 우리는 비닐우산이 썩는데 걸리는 100년을 줄일 수 있습니다.
          <br /> 비가 오는 날, 누구나 쉽게 할 수 있는 작은 행동이 모여
          <br className="lg:hidden" /> 더 나은 세상을 만들 수 있다고 여깁니다.
        </div>
      </div>
      <div className="lg:hidden">
        <img src={umbrellaImg} alt="업브렐라 이미지" className="w-420" />
      </div>
      <SectionBullet index={1} />
    </section>
  );
};

export default StorySection3;
