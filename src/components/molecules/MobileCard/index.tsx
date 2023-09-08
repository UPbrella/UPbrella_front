import MobileCardInfo from "@/components/atoms/MobileCardInfo";
import NaverDirectionBtn from "@/components/atoms/NaverDirectionBtn";

const MobileCard = () => {
  return (
    <div className="my-20 px-20">
      <div className="text-center text-18 font-bold	mb-16">연세대학교 신촌캠퍼스 공학원</div>
      <div className="flex gap-x-2 mb-18">
        <img
          className="rounded-8 w-120 h-120"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPDTu1gXu_OdbO6pHVYchM1GRheqKF9M-8_Q&usqp=CAU"
        ></img>
        <MobileCardInfo></MobileCardInfo>
      </div>
      <NaverDirectionBtn />
    </div>
  );
};

export default MobileCard;
