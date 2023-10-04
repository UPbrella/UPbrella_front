import { Link } from "react-router-dom";

type MypageContactSectionProps = {
  content1: string;
  content2: string;
  buttonContent: string;
  url: string;
};

const MypageContactSection = ({
  content1,
  content2,
  buttonContent,
  url,
}: MypageContactSectionProps) => {
  return (
    <section className="w-full h-200 p-24 border border-solid border-gray-200 rounded-12">
      <div className="h-full flex flex-col justify-between">
        <div>
          {content1}
          <br />
          {content2}
        </div>
        <Link
          className="px-20 w-fit h-48 flex justify-center items-center rounded-8 bg-primary-200"
          to={url}
        >
          <p className="text-primary-500 text-16 font-semibold leading-24">{buttonContent}</p>
        </Link>
      </div>
    </section>
  );
};
export default MypageContactSection;
