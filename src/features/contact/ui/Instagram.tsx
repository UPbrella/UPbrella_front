import React from "react";

const Instagram = () => {
  return (
    <div className="max-w-314 w-full h-184 flex flex-col justify-between items-start py-24 px-20 border border-gray-200 rounded-12 bg-white lg:px-20 sm:px-0">
      <div className="text-16 leading-24 text-gray-700">
        업브렐라 이용 안내 관련 및 급한 문의는
        <br />
        업브렐라 인스타그램 계정으로 부탁드려요!
      </div>
      <a
        className=" bg-primary-200 rounded-8 px-20 py-12 font-semibold text-16 leading-24 text-primary-500"
        href="https://www.instagram.com/direct/t/17846148278607764"
      >
        업브렐라 DM으로 문의하기
      </a>
    </div>
  );
};

export default Instagram;
