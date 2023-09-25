import Instagram from "@/components/atoms/Contact/Instagram";
import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/atoms/Contact/Input";
import TextArea from "@/components/atoms/Contact/TextArea";
import Button from "@/components/atoms/Contact/Button";
import emailjs from "@emailjs/browser";
import Footer from "@/components/organisms/Footer";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // 필수조건 입력 => setIsActive(true)
  useEffect(() => {
    if (name && email && title && content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [name, email, title, content]);

  // Email 설정
  const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const PUB_KEY = import.meta.env.VITE_EMAIL_PUB_KEY;

  // 이메일 전송
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isActive && form.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUB_KEY).then(() => {
        setName("");
        setPhone("");
        setEmail("");
        setTitle("");
        setContent("");
        setIsComplete(true);
      });
    }
  };

  // 토스트메시지
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="my-100 lg:my-20 flex justify-center items-center relative">
      <div className="w-full h-full px-40 flex items-start lg:flex-col lg:px-20 md:px-0 sm:px-20">
        <div className="w-full flex-col mr-32 px-40 py-24 lg:px-0 lg:py-0">
          <div className="font-semibold text-24 leading-32 text-black mb-8">CONTACT US</div>
          <div className="text-16 leading-24 text-gray-700 mb-40">
            업브렐라와의 사업 제휴 관련 문의하시고 싶은 내용을 작성해주세요.
          </div>
          <Instagram />
        </div>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="p-32 bg-white w-full rounded-20 lg:p-0 md:mt-40"
        >
          <div className="flex">
            <Input
              label="이름"
              placeholder="이름 입력"
              setValue={setName}
              name="name"
              value={name}
            />
            <Input
              label="연락처"
              optional
              placeholder="010-1234-5678"
              setValue={setPhone}
              name="phone"
              value={phone}
            />
          </div>
          <Input
            label="이메일"
            placeholder="upbrella@gmail.com"
            setValue={setEmail}
            name="email"
            value={email}
          />
          <Input
            label="제목"
            placeholder="제목 입력"
            setValue={setTitle}
            name="title"
            value={title}
          />
          <TextArea
            label="문의 사항"
            placeholder="문의 사항을 작성해주세요!"
            setValue={setContent}
            name="content"
            value={content}
          />
          <Button isActive={isActive} isComplete={isComplete} setIsComplete={setIsComplete} />
        </form>
      </div>

      {isComplete && (
        <div className="fixed right-[80px] bottom-[100px] md:left-0 md:right-0 md:bottom-[20px] flex items-end justify-end md:justify-center w-full h-full">
          <div className="w-330 h-48 rounded-8 py-12 text-15 leading-24 bg-gray-700 text-white text-center">
            문의 접수 완료!
          </div>
        </div>
      )}

      <div className="w-full fixed bottom-0 left-0">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
