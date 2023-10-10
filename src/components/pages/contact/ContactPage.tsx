import Instagram from "@/components/atoms/Contact/Instagram";
import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/atoms/Contact/Input";
import TextArea from "@/components/atoms/Contact/TextArea";
import Button from "@/components/atoms/Contact/Button";
import emailjs from "@emailjs/browser";
import { formatPhoneNumber } from "@/utils/utils";
import toast from "react-hot-toast";
import Footer from "@/components/organisms/Footer";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const formattedPhone = formatPhoneNumber(phone);

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
      try {
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUB_KEY).then(() => {
          setName("");
          setPhone("");
          setEmail("");
          setTitle("");
          setContent("");
          setIsComplete(true);
        });
      } catch (e) {
        toast.error("잘못된 요청이거나 서버 오류입니다.");
      }
    }
  };

  // 토스트메시지
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isComplete) {
        setIsComplete(false);
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [isComplete]);

  return (
    <>
      <div className="h-screen relative">
        <div className="flex items-center justify-center my-100 lg:my-20 ">
          <div className="flex items-start w-full h-full px-40 lg:flex-col lg:px-0">
            <div className="flex-col w-full px-40 py-24 mr-32 lg:px-0 lg:py-0">
              <div className="mb-8 font-semibold text-black text-24 leading-32">CONTACT US</div>
              <div className="mb-40 text-gray-700 text-16 leading-24 lg:mb-20">
                업브렐라와의 사업 제휴 관련 문의하시고 싶은 내용을 작성해주세요.
              </div>
              <div className="mb-40">
                <Instagram />
              </div>
            </div>
            <form
              ref={form}
              onSubmit={sendEmail}
              className="w-full p-32 bg-white rounded-20 lg:p-0 md:mt-40"
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
                  value={formattedPhone}
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
              <Button isActive={isActive} />
            </form>
          </div>

          {isComplete && (
            <div className="fixed right-[80px] bottom-[100px] md:left-0 md:right-0 md:bottom-[20px] flex items-end justify-end md:justify-center w-full h-full">
              <div className="h-48 py-12 text-center text-white bg-gray-700 w-330 rounded-8 text-15 leading-24">
                문의 접수 완료!
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-[100px] left-0 right-0 bg-white">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
