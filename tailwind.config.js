const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: px0_1000,
      height: px0_1000,
      borderRadius: px0_1000,
      fontSize: px0_100,
      colors: {
        "primary-200": "#FEF4F2",
        "primary-500": "#E86F52",
        "gray-300": "#DDDDDD",
        "gray-600": "#666666",
        "gray-700": "#333333",
      },
    },
  },
  plugins: [],
};
