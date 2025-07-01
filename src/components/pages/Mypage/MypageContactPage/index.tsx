import MypageContactCard from "@/components/organisms/Mypage/MypageContactCard";
import MypageLayout from "@/components/pages/Mypage/MypageLayout";

const MypageContactPage = () => {
  return <MypageLayout renderChildren={() => <MypageContactCard />} />;
};
export default MypageContactPage;
