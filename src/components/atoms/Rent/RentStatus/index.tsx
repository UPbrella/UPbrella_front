import { useRef, useEffect } from "react";

export type RentStatusProps = {
  label: string;
  placeholder?: string;
};

const RentStatus = ({ label, placeholder }: RentStatusProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 textarea의 높이를 자동으로 설정
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleTextareaChange = () => {
    // textarea의 내용이 변경될 때마다 높이를 자동으로 조정
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex-col w-330 p-5">
      <div className="flex items-center mb-4 text-gray-700 text-15 leading-22 font-normal">
        {label}
        <div className="ml-4 text-gray-500 text-12 font-normal">(선택)</div>
      </div>
      <textarea
        ref={textareaRef}
        onChange={handleTextareaChange}
        className="w-full mt-4 rounded-8 border border-gray-300 p-12 text-15 text-gray-700 leading-22 font-normal placeholder-gray-300 resize-none overflow-hidden"
        placeholder={placeholder}
      />
    </div>
  );
};

export default RentStatus;
