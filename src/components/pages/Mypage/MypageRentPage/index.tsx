import MypageRentCard from "@/components/organisms/Mypage/MypageRentCard";
import MypageLayout from "@/components/pages/Mypage/MypageLayout";

const MypageRentPage = () => {
  return <MypageLayout renderChildren={(data) => <MypageRentCard rentList={data} />} />;
};
export default MypageRentPage;
