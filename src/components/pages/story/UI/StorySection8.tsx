import FormButton from "@/components/atoms/Form/FormButton";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const StorySection8 = () => {
  const navigate = useNavigate();

  return (
    <CssSectionBg className="mt-80 h-[400px]">
      <CssSectionBgColor className="h-full">
        <div className="text-center text-white px-20 flex flex-col gap-[40px] h-[100%] justify-center items-center">
          <div className="flex flex-col gap-[24px] font-semibold">
            <div className="text-h32 lg:text-h24">
              지구를 지키는 작은 우산, 업브렐라를 펼쳐주세요!
            </div>
            <div className="text-h18 lg:text-h15 text-gray-200">A Better Choice, UPbrella</div>
          </div>
          <div className="w-155">
            <FormButton
              label="대여방법 알아보기"
              handleOpen={() => {
                navigate("/information");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              isActive
            />
          </div>
        </div>
      </CssSectionBgColor>
    </CssSectionBg>
  );
};

const CssSectionBg = styled.section`
  background-image: url("/src/assets/Story/section8_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const CssSectionBgColor = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%);
`;

export default StorySection8;
