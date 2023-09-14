const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: { max: "360px" },
      md: { max: "640px" },
      lg: { max: "1024px" },
      xl: { min: "1025px" },
    },
    extend: {
      maxWidth: px0_1000,
      maxHeight: px0_1000,
      width: px0_1000,
      height: px0_1000,
      borderRadius: px0_1000,
      fontSize: px0_100,
      lineHeight: px0_100,
      padding: px0_1000,
      margin: px0_1000,
      colors: {
        "primary-700": "#E05938",
        "primary-600": "#E86546",
        "primary-500": "#E86F52",
        "primary-400": "#FCE7E3",
        "primary-300": "#FCEDEA",
        "primary-200": "#FEF4F2",
        "primary-100": "#FFFCFC",
        black: "#111111",
        "gray-700": "#333333",
        "gray-600": "#666666",
        "gray-500": "#999999",
        "gray-400": "#CCCCCC",
        "gray-300": "#DDDDDD",
        "gray-200": "#EEEEEE",
        "gray-100": "#F8F8FA",
        red: "#FF0000",
        white: "#FFFFFF",
        kakao: "#FEE500",
        kakaoblack: "#000000",
      },
      backgroundImage: {
        basic: "url('/src/assets/basicbackground.png')",
      },
    },
  },
  plugins: [],
};
