import { HeaderLogo } from "@/components/atoms/Header/HeaderLogo";

export const HeaderContents = () => {
  return (
    <div className="h-full max-w-[1500px] mx-auto px-[30px] flex items-center border-solid border-[1px]">
      <HeaderLogo />
    </div>
  );
};
