import { useRef, useEffect, useState, ChangeEvent } from "react";

export type FormStatusProps = {
  label: string;
  placeholder?: string;
};

const FormStatus = ({ label, placeholder }: FormStatusProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 textarea의 높이를 자동으로 설정
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // textarea의 내용이 변경될 때마다 높이를 자동으로 조정
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // text를 추가할 때 높이 조정
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // text를 지웠을 때 높이 조정
    }

    const { value } = event.target;
    setIsWriting(Boolean(value));
    // setStatus(event.target.value);
  };

  const borderColor = isWriting ? "gray-600" : "gray-300";
  const textColor = isWriting ? "black" : "gray-400";

  return (
    <div className="flex-col max-w-2xl p-5 mb-32">
      <div className="flex items-center mb-4 text-gray-700 text-15 leading-22 font-normal">
        {label}
        <div className="ml-4 text-gray-500 text-12 font-normal">(선택)</div>
      </div>
      <textarea
        ref={textareaRef}
        onChange={handleTextareaChange}
        rows={1}
        className={`w-full mt-4 rounded-8 border border-${borderColor} p-10 text-15 text-${textColor} leading-22 placeholder-gray-300 resize-none overflow-hidden focus:border-gray-600 focus:outline-none`}
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
};

export default FormStatus;
