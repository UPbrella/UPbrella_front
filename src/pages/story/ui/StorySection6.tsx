import { useTranslation } from "react-i18next";

const StorySection6 = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-80 flex gap-[16px] lg:flex-col px-40 md:px-0">
      <Card
        header={t("story.s6.team1.name")}
        content={t("story.s6.team1.desc")}
        bgColor={"#F6FBFF"}
      />
      <Card
        header={t("story.s6.team2.name")}
        content={t("story.s6.team2.desc")}
        bgColor={"#FEF4F2"}
      />
    </section>
  );
};

export default StorySection6;

const Card = ({
  header,
  content,
  bgColor,
}: {
  header: string;
  content: string;
  bgColor: string;
}) => {
  return (
    <div
      style={{ background: bgColor }}
      className="flex-1 rounded-[20px] p-40 lg:p-32 flex flex-col gap-[24px] font-semibold"
    >
      <div className="text-gray-700 text-h24 lg:text-h20">{header}</div>
      <div className="text-gray-600 whitespace-pre-wrap text-h18 lg:text-h15">{content}</div>
    </div>
  );
};
