import { SectionBulletContext } from "@/components/pages/story/UpbrellaStoryPage";
import { useContext } from "react";

export const SectionBullet = ({ index }: { index?: number }) => {
  const context = useContext(SectionBulletContext);

  const sections = ["환경적 임팩트 창출", "지역 공동체 의식 강화", "업브렐라 팀"];

  return (
    <div className="absolute right-[40px] flex flex-col gap-[6px] lg:hidden">
      {context &&
        sections.map((name, i) => {
          const isActive = context.activeIndex === i + 1;
          const isSameIndex = index === i + 1;

          return (
            <div key={name} className="flex justify-end items-center gap-[4px]">
              {isActive && isSameIndex && <div className="text-h14 text-primary-500">{name}</div>}
              <div className="w-8 flex justify-center">
                <div
                  className={`${
                    isActive && isSameIndex ? "w-8 h-8 bg-primary-500" : "w-4 h-4 bg-primary-400"
                  } rounded-[50%] cursor-pointer`}
                  onClick={() => {
                    context.setActiveIndex(i + 1);
                  }}
                ></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
