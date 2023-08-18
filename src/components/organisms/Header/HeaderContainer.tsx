// import { HeaderContents } from "@/components/molecules/Header/HeaderContents";
import HeaderContents from "@/components/molecules/Header/HeaderContents";

export const HeaderContainer = () => {
  return (
    <div className="h-80">
      {/* 로그인한 경우 */}
      {/* <HeaderContents isLogin name="김민희" />  */}
      {/* 로그인하지 않은 경우 */}
      <HeaderContents />
    </div>
  );
};
