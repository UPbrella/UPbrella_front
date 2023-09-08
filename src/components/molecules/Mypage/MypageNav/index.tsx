import MypageNavSection from "@/components/atoms/Mypage/MypageNavSection";

export type MypageNavProps = {
  isClick: boolean;
  onClick?: () => void;
};

const MypageNav = ({ isClick, onClick }: MypageNavProps) => {
  const navList = ["이용내역", "환급계좌 등록/변경", "개인정보 조회", "문의하기"];
  return (
    <section className="flex flex-col w-full">
      {navList.map((navName, index) => {
        if (index === navList.length - 1) {
          return (
            <div key={index}>
              <MypageNavSection navName={navName} isClick={isClick} onClick={onClick} />
            </div>
          );
        }
        return (
          <div key={index} className="mb-8">
            <MypageNavSection navName={navName} isClick={isClick} onClick={onClick} />
          </div>
        );
      })}
    </section>
  );
};
export default MypageNav;
