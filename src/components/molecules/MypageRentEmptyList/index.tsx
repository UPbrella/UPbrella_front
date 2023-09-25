import EmptyStateImg from "@/assets/empty_states_img.svg";
const MypageRentEmptyList = () => {
  return (
    <div className="p-20 flex flex-col justify-center items-center">
      <div className="w-80 mb-16">
        <img src={EmptyStateImg} />
      </div>
      <div className="text-gray-700 text-16 font-normal leading-24">이용 내역이 아직 없어요!</div>
    </div>
  );
};
export default MypageRentEmptyList;
