export type FormBasicProps = {
  label: string;
  value: string | number;
};

const FormBasic = ({ label, value }: FormBasicProps) => {
  return (
    <div className="flex flex-col max-w-2xl p-5 mb-32">
      <div className="flex items-center mb-4 text-gray-700 text-15 leading-22 mr-4">{label}</div>
      <div className="w-full h-48 mt-4 rounded-8 p-12 gap-2.5 text-15 text-gray-500 leading-22 placeholder-gray-300 bg-gray-100">
        {value}
      </div>
    </div>
  );
};

export default FormBasic;
