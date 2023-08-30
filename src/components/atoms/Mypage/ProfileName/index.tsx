export type ProfileNameProps = {
  userName: string;
  totalRentNum: number;
};

const ProfileName = ({ userName, totalRentNum }: ProfileNameProps) => {
  return (
    <section className="flex flex-col justify-center items-center w-full text-gray-700 border-b border-gray-200 border-solid">
      <div className="mb-8 font-bold flex justify-center items-end">
        <p className="mr-4 text-24 leading-32">{userName}</p>
        <p className="text-16 leading-24">님</p>
      </div>
      <div className="flex flex-col justify-center items-center mb-24 text-14 font-normal leading-20">
        <p>{userName.slice(-2)}님은 비닐우산이 썩는</p>
        <p>{totalRentNum * 100}년의 세월을 줄였습니다.</p>
      </div>
    </section>
  );
};
export default ProfileName;
