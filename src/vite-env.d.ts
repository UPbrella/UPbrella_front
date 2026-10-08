/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// swiper CSS subpath export(확장자 없음)는 vite/client의 "*.css" 와일드카드와 매칭되지 않는다.
declare module "swiper/css";
declare module "swiper/css/navigation";
