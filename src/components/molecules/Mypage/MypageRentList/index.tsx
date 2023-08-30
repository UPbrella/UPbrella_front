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
    <section className="flex flex-col">
      {rentList.map((rent, index) => {
        if (index === rentList.length - 1) {
          return (
            <div key={index}>
              <MypageRentSection rentInfo={rent} />
            </div>
          );
        }
        return (
          <div key={index} className="mb-16">
            <MypageRentSection rentInfo={rent} />
          </div>
        );
      })}
    </section>
  );
};
export default MypageRentList;
