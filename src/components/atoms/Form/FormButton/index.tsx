export type FormButtonProps = {
  label: string;
  isActive: boolean;
  handleOpen?: () => void;
};

const FormButton = ({ label, isActive, handleOpen }: FormButtonProps) => {
  return (
    <div className="max-w-2xl">
      <button
        className={`w-full h-48 bg-primary-500 rounded-8 text-white text-16 leading-24 font-semibold ${
          isActive ? "" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={isActive ? handleOpen : undefined}
        disabled={!isActive}
      >
        {label}
      </button>
    </div>
  );
};

export default FormButton;
