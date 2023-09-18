import errorpage_img from "@/assets/errorpage_img.png";

export type TErrorComponent = {
  error: string;
  subError: string;
};

const ErrorComponent = ({ error, subError }: TErrorComponent) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={errorpage_img} className="w-196 h-160" />
      <div className="text-18 font-semibold mt-16">{error}</div>
      <div className="text-gray-600 mt-8">{subError}</div>
      <button className="px-32 py-16 bg-primary-200 text-primary-500 text-18 font-semibold rounded-8 mt-32">
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default ErrorComponent;
