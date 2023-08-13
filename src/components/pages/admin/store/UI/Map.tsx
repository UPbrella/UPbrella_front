import { forwardRef } from "react";

type TProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
};

// 네이버 map 으로 사용할 컴포넌트
const Map = forwardRef<HTMLDivElement, TProps>(function Map(
  { width = "100%", height = "60vh", borderRadius = "0px" }: TProps,
  ref
) {
  return <div id="map" ref={ref} style={{ width, height, borderRadius }}></div>;
});

export default Map;
