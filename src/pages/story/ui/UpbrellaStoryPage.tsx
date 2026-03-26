import { createContext, useEffect, useRef, useState } from "react";
import { FixWidthWrapper } from "@/shared/ui/FixWidthWrapper";
import { HeaderContainer } from "@/widgets/header/ui/HeaderContainer";
import StorySection1 from "@/pages/story/ui/StorySection1";
import StorySection2 from "@/pages/story/ui/StorySection2";
import StorySection3 from "@/pages/story/ui/StorySection3";
import StorySection4 from "@/pages/story/ui/StorySection4";
import StorySection5 from "@/pages/story/ui/StorySection5";
import StorySection6 from "@/pages/story/ui/StorySection6";
import StorySection7 from "@/pages/story/ui/StorySection7";
import StorySection8 from "@/pages/story/ui/StorySection8";
import Footer from "@/widgets/footer/ui/Footer";

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
      <HeaderContainer />

      <SectionBulletContext.Provider value={{ activeIndex, setActiveIndex }}>
        <main className="break-keep">
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
      <Footer />
    </div>
  );
};

export default UpbrellaStoryPage;
