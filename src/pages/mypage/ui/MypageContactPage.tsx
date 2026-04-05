import MypageContactCard from "@/pages/mypage/ui/MypageContactCard";
import MypageLayout from "@/pages/mypage/ui/MypageLayout";

const MypageContactPage = () => {
  return <MypageLayout renderChildren={() => <MypageContactCard />} />;
};
export default MypageContactPage;
