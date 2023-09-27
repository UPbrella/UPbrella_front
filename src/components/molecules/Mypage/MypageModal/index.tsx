export type MypageModalProps = {
  children: JSX.Element;
  width: string;
};

const MypageModal = ({ children, width }: MypageModalProps) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className={`w-${width} bg-white rounded-20 p-32 flex justify-center items-center`}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MypageModal;
