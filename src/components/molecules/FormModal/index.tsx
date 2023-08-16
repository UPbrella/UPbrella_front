export type FormModalProps = {
  children: JSX.Element;
  height: string; // 모달이 width는 동일한데 height는 달라 prop으로 받았습니다
};

const FormModal = ({ children, height }: FormModalProps) => {
  return (
    <div className="max-w-2xl fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-10 z-50 flex justify-center items-center">
      <div
        className={`w-380 h-${height} bg-white mx-20 rounded-8 flex justify-center items-center`}
      >
        <div className="flex flex-end items-center p-10">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
