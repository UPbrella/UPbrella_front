import Instagram from "@/components/atoms/Contact/Instagram";
import React from "react";
// import { CONTACT_TABLE } from "./helper";
// import Input from "@/components/atoms/Contact/Input";
// import { TContact } from "@/types/contact/ContactTypes";

const ContactPage = () => {
  return (
    <div className="w-full h-full px-40 flex items-center">
      <div className="flex flex-col mr-32 px-40 py-24">
        <div className="font-semibold text-24 leading-32 text-black mb-8">CONTACT US</div>
        <div className="text-16 leading-24 text-gray-700 mb-40">
          업브렐라와의 사업 제휴 관련 문의하시고 싶은 내용을 작성해주세요.
        </div>
        <Instagram />
      </div>
      <div className="p-32">
        {/* {Object.keys(CONTACT_TABLE).map((key) => {
          const item = CONTACT_TABLE[key];
          return (
            <Input
              label={item.label}
              optional={item.optional}
              placeholder={item.placeholder}
              line={item.line}
            />
          );
        })} */}
        <button></button>
      </div>
    </div>
  );
};

export default ContactPage;
