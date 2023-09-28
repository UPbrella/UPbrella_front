export type ContactInputProps = {
  label: string;
  optional?: boolean;
  placeholder: string;
  setValue: (value: string) => void;
  name: string;
  value?: string;
};

const Input = ({ label, optional, placeholder, setValue, name, value }: ContactInputProps) => {
  return (
    <div className="flex flex-col p-5 mb-32 w-full">
      <div className="flex items-center">
        <div className="flex items-center mb-4 text-gray-700 text-15 leading-22 mr-4">{label}</div>
        {optional && <div className="text-13 leading-16 text-gray-500">(선택)</div>}
      </div>
      <input
        className="w-full h-48 mt-4 rounded-8 p-12 gap-2.5 text-15 text-black leading-22 placeholder-gray-300 border border-gray-300 focus:border-black focus:outline-none"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        value={value}
      />
    </div>
  );
};

export default Input;
