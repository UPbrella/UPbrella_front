const StorySection6 = () => {
  return (
    <section className="mt-80 flex gap-[16px] lg:flex-col px-40 md:px-0">
      <Card
        header={"서비스고도화팀"}
        content={
          "서비스고도화팀은 사용자 경험을 조사하고, 대여/반납 데이터를 분석하여 서비스 운영을 위한 최적의 정책을 수립함으로써 업브렐라 이용자의 만족도를 높이고자 노력합니다."
        }
        bgColor={"#F6FBFF"}
      />
      <Card
        header={"대외협력팀"}
        content={
          "대외협력팀은 신촌 상권과 제휴를 맺어 공유 우산을 보급하고, 마케팅으로 서비스 인지도를 높입니다. \n나아가 새로운 사업을 모색해 서비스의 확장에 힘쓰고 있습니다."
        }
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
