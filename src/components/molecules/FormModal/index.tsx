export type FormModalProps = {
  children: JSX.Element;
  height: string; // 모달이 width는 동일한데 height는 달라 prop으로 받았습니다
};

const FormModal = ({ children, height }: FormModalProps) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div
        className={`w-340 h-${height} bg-white mx-20 rounded-8 flex justify-center items-center`}
      >
        <div className="flex items-center p-10 flex-end">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
