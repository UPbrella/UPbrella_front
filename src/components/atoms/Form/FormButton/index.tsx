export type FormButtonProps = {
  label: string;
  handleOpen?: () => void;
};

const FormButton = ({ label, handleOpen }: FormButtonProps) => {
  return (
    <div className="max-w-2xl">
      <button
        className="w-full h-48 bg-primary-500 rounded-8 text-white text-16 leading-24 font-semibold"
        onClick={handleOpen}
      >
        {label}
      </button>
    </div>
  );
};

export default FormButton;
