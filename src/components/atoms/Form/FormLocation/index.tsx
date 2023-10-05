export type FormLocationProps = {
  label: string;
  isTitle?: boolean;
  value: string;
};

const FormLocation = ({ label, isTitle, value }: FormLocationProps) => {
  const ratioWidth = isTitle ? "35%" : "65%";

  return (
    <div className="flex-col p-5 mb-32 " style={{ width: ratioWidth }}>
      <div className="flex items-center mb-4 text-gray-700 text-15 leading-22 font-normal mr-4">
        {label}
      </div>
      <div className="mt-4 rounded-8 py-12 px-12 text-15 text-gray-500 leading-22 placeholder-gray-300 bg-gray-100">
        {value}
      </div>
    </div>
  );
};

export default FormLocation;
