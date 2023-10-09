import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "@/components/organisms/ImgSwiper/styles.css";
import DefaultImg from "@/assets/Story/section4-1.jpeg";

export type TImgSwiper = {
  images: Array<string>;
};

const ImgSwiper = ({ images }: TImgSwiper) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      loop
      scrollbar={{ draggable: true }}
      className="w-full aspect-storeImg max-w-[1024px]"
    >
      {!images.length && (
        <SwiperSlide>
          <img src={DefaultImg} alt="Image" />
        </SwiperSlide>
      )}
      {images.map((image) => (
        <SwiperSlide key={image}>
          <img
            src={image}
            alt="Image"
            onError={(e) => {
              e.currentTarget.src = DefaultImg;
            }}
            className="object-cover w-full aspect-storeImg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImgSwiper;
