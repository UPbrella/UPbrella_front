import MypageRentSection from "@/components/atoms/Mypage/MypageRentSection";

export type MypageRentListProps = {
  rentList: TRentContentInfo[];
};

export type TRentContentInfo = {
  umbrellaUuid: number;
  rentedAt: string;
  rentedStore: string;
  returnedDue: string; //TODO: returnedDue에는 계산 값을 넣어야
  returnAt: string;
  returned: boolean;
  refunded: boolean;
};

const MypageRentList = ({ rentList }: MypageRentListProps) => {
  return (
    <section className="flex flex-col flex-1">
      {rentList.map((rent, index) => {
        if (index === rentList.length - 1) {
          return (
            <div key={index} className="flex flex-1">
              <MypageRentSection isProfile={false} isRecent={false} rentInfo={rent} />
            </div>
          );
        } else if (index === 0) {
          return (
            <div key={index} className="flex flex-1 mb-16">
              <MypageRentSection isProfile={false} isRecent={true} rentInfo={rent} />
            </div>
          );
        }
        return (
          <div key={index} className="flex flex-1 mb-16">
            <MypageRentSection isProfile={false} isRecent={false} rentInfo={rent} />
          </div>
        );
      })}
    </section>
  );
};
export default MypageRentList;
