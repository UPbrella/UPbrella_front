export type TInformTitle = {
  stepTitle: string;
  title: string;
};

const InformTitle = ({ stepTitle, title }: TInformTitle) => {
  return (
    <>
      <div className="text-primary-500 text-16 mb-4">{stepTitle}</div>
      <div className="font-semibold text-24">{title}</div>
    </>
  );
};

export default InformTitle;
