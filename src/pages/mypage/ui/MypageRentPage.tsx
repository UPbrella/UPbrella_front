import MypageRentCard from "@/pages/mypage/ui/MypageRentCard";
import MypageLayout from "@/pages/mypage/ui/MypageLayout";

const MypageRentPage = () => {
  return <MypageLayout renderChildren={(data) => <MypageRentCard rentList={data} />} />;
};
export default MypageRentPage;
