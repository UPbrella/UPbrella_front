import { TRentHistoriesRes } from "@/api/clientUserApi";
import errorpage_img from "@/assets/errorpage_img.png";
import EmptyArea from "@/components/atoms/EmptyArea";
import Footer from "@/components/organisms/Footer";
import MypageLeftCard from "@/components/organisms/Mypage/MypageLeftCard";
import { useGetRentHistories } from "@/hooks/queries/userQueries";
import { BASIC_ROUTES_URL } from "@/routes/basicRouter";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type TProps = {
  renderChildren: (data: TRentHistoriesRes[]) => ReactNode;
};

const MypageLayout = ({ renderChildren }: TProps) => {
  const { data, isLoading, isError } = useGetRentHistories();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="m-auto">
        <EmptyArea text="우산 대여 내역을 불러오는 중..." />
      </div>
    );

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center px-20 m-auto">
        <img src={errorpage_img} className="w-196 h-160" />
        <div className="mt-16 font-semibold text-18">
          죄송합니다. 마이페이지를 불러오지 못했어요 :)
        </div>
        <div className="mt-8 text-gray-600">잠시 후에 다시 시도해주세요.</div>
        <button
          className="px-32 py-16 mt-32 font-semibold bg-primary-200 text-primary-500 text-18 rounded-8"
          onClick={() => navigate(BASIC_ROUTES_URL.root.path())}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 justify-between items-center">
      <div className="flex flex-col w-full xl:mt-24 xl:px-40 lg:max-w-640 lg:py-20 lg:w-full lg:px-20">
        <div className="mb-32 font-semibold text-black text-24 leading-32">마이페이지</div>
        <div className="xl:flex">
          <div className="xl:mr-32">
            <MypageLeftCard rentList={data} />
          </div>
          {renderChildren(data)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MypageLayout;
