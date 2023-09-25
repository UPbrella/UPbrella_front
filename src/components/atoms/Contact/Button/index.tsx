export type ButtonProps = {
  isActive: boolean;
  isComplete: boolean;
  setIsComplete: (value: boolean) => void;
};

const Button = ({ isActive, isComplete, setIsComplete }: ButtonProps) => {
  return (
    <div>
      <button
        type="submit"
        className={`w-full h-48 bg-primary-500 rounded-8 text-white text-16 leading-24 font-semibold  ${
          isActive ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isActive}
        onClick={() => setIsComplete(!isComplete)}
      >
        문의하기
      </button>
    </div>
  );
};

export default Button;
