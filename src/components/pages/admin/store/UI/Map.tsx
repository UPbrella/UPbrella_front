import { forwardRef } from "react";

type TProps = {
  width?: string;
  height?: string;
};

// 네이버 map 으로 사용할 컴포넌트
const Map = forwardRef<HTMLDivElement, TProps>(function Map(
  { width = "500px", height = "60vh" }: TProps,
  ref
) {
  return <div id="map" ref={ref} style={{ width, height }}></div>;
});

export default Map;
