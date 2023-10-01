import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { HeaderContainer } from "@/components/organisms/Header/HeaderContainer";
import StorySection1 from "@/components/pages/story/UI/StorySection1";
import StorySection2 from "@/components/pages/story/UI/StorySection2";
import StorySection3 from "@/components/pages/story/UI/StorySection3";
import StorySection4 from "@/components/pages/story/UI/StorySection4";
import StorySection5 from "@/components/pages/story/UI/StorySection5";
import StorySection6 from "@/components/pages/story/UI/StorySection6";
import StorySection7 from "@/components/pages/story/UI/StorySection7";
import StorySection8 from "@/components/pages/story/UI/StorySection8";
import Footer from "@/components/organisms/Footer";

// bullet 이동을 위한 Context
export const SectionBulletContext = createContext<{
  activeIndex: number;
  setActiveIndex: (n: number) => void;
} | null>(null);

const UpbrellaStoryPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  // bullet 스크롤 이동
  useEffect(() => {
    if (activeIndex) {
      const ref = scrollRef.current[activeIndex - 1];
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  return (
    <div className="bg-white">
      {/* header */}
      <header>
        <FixWidthWrapper>
          <HeaderContainer />
        </FixWidthWrapper>
      </header>

      <SectionBulletContext.Provider value={{ activeIndex, setActiveIndex }}>
        <main>
          {/* section1 */}
          <StorySection1 />

          <FixWidthWrapper>
            {/* section2 */}
            <StorySection2 />

            {/* section3 */}
            <div ref={(el) => (scrollRef.current[0] = el)}>
              <StorySection3 />
            </div>
          </FixWidthWrapper>

          {/* section4 */}
          <div ref={(el) => (scrollRef.current[1] = el)}>
            <StorySection4 />
          </div>

          {/* section5 */}
          <div ref={(el) => (scrollRef.current[2] = el)}>
            <StorySection5 />
          </div>

          <FixWidthWrapper>
            {/* section6 */}
            <StorySection6 />

            {/* section7 */}
            <StorySection7 />
          </FixWidthWrapper>

          {/* section8 */}
          <StorySection8 />
        </main>
      </SectionBulletContext.Provider>

      {/* footer */}
      <FixWidthWrapper>
        <Footer />
      </FixWidthWrapper>
    </div>
  );
};

export const FixWidthWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[1440px] px-40 mx-auto md:px-20 sm:mx-0">{children}</div>;
};

export default UpbrellaStoryPage;
