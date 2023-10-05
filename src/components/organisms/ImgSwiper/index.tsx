import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "@/components/organisms/ImgSwiper/styles.css";

export type TImgSwiper = {
  maxWidth?: number;
  maxHeight?: number;
  images: Array<string>;
};

const ImgSwiper = ({ maxWidth, maxHeight, images }: TImgSwiper) => {
  const swiperStyles = {
    maxWidth: maxWidth ? `${maxWidth}px` : "100%", // maxWidth props에 따라 설정
    maxHeight: maxHeight ? `${maxHeight}px` : "100%", // maxHeight props에 따라 설정
  };
  return (
    <div className="flex justify-start w-full h-full lg:min-w-400" style={swiperStyles}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        loop
        scrollbar={{ draggable: true }}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} alt="Image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImgSwiper;
