import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "@/components/organisms/ImgSwiper/styles.css";

export type TImgSwiper = {
  maxWidth?: number;
  maxHeight?: number;
};

const ImgSwiper = ({ maxWidth, maxHeight }: TImgSwiper) => {
  const swiperStyles = {
    maxWidth: maxWidth ? `${maxWidth}px` : "100%", // maxWidth props에 따라 설정
    maxHeight: maxHeight ? `${maxHeight}px` : "100%", // maxHeight props에 따라 설정
  };
  return (
    <div className="flex justify-start" style={swiperStyles}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        loop
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <img
            src="https://m.godshop.co.kr/web/product/big/202011/b472f812f7bb5cdaa048439de5f0360f.jpg"
            alt="Image"
          />
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImgSwiper;
