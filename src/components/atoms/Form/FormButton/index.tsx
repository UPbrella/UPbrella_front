export type FormButtonProps = {
  label: string;
};

const FormButton = ({ label }: FormButtonProps) => {
  return (
    <div className="max-w-2xl">
      <button className="w-full h-48 bg-primary-500 rounded-8 text-white text-16 leading-24 font-semibold">
        {label}
      </button>
    </div>
  );
};

export default FormButton;
