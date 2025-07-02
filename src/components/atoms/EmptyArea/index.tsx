import EmptyStateImg from "@/assets/empty_states_img.svg";

type TProps = {
  text?: string;
};

const EmptyArea = ({ text }: TProps) => {
  return (
    <div className="flex flex-col justify-center items-center p-20">
      <div className="mb-16 w-80">
        <img alt="empty-state-img" src={EmptyStateImg} />
      </div>
      <div className="font-normal text-gray-700 text-16 leading-24">{text}</div>
    </div>
  );
};
export default EmptyArea;
