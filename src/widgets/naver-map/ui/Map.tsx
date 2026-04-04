import { forwardRef } from "react";

type TProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
};

const Map = forwardRef<HTMLDivElement, TProps>(function Map(
  { width = "100%", height = "60vh", borderRadius = "0px" }: TProps,
  ref
) {
  return <div id="map" ref={ref} style={{ width, height, borderRadius }}></div>;
});

export default Map;
