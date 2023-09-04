export type MypageRentSectionProps = {
  rentInfo: TRentInfo;
};
export type TRentInfo = {
  umbrellaUuid: number;
  rentedAt: string;
  rentedStore: string;
  returnedDue: string;
  returnAt: string;
  returned: boolean;
  refunded: boolean;
};

const MypageRentSection = ({ rentInfo }: MypageRentSectionProps) => {
  const { umbrellaUuid, rentedAt, rentedStore, returnedDue, returnAt, returned, refunded } =
    rentInfo;
  const rentInfoContent = [
    ["우산 번호", String(umbrellaUuid)],
    ["대여 일자", rentedAt],
    ["대여 지점", rentedStore],
    ["반납 기한", returnedDue],
    ["반납 일자", returnAt],
    ["반납 여부", returned],
    ["환급 여부", refunded],
  ];

  return (
    <div className="flex p-24 bg-white border border-gray-200 text-gray-700 border-solid rounded-12">
      <div className="flex flex-col text-15">
        {rentInfoContent.map((info, index) => {
          if (info[0] === "우산 번호") {
            if (typeof info[1] === "string" && info[1].length === 1) {
              info[1] = "0" + info[1];
            }
            info[1] += "번";
          }
          if (info[0] === "반납 여부") {
            info[1] = info[1] ? "반납 완료" : "반납 전";
          }
          if (info[0] === "환급 여부") {
            info[1] = info[1] ? "환급 완료" : "환급 전"; //TODO: 4가지 상태 가능하다.
          }
          if (index === rentInfoContent.length - 1) {
            return (
              <div key={index} className="flex">
                <p className="mr-16 font-semibold">{info[0]}</p>
                <p className="font-normal">{info[1]}</p>
              </div>
            );
          }
          return (
            <div key={index} className="flex mb-8">
              <p className="mr-16 font-semibold">{info[0]}</p>
              <p className="font-normal">{info[1]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MypageRentSection;
