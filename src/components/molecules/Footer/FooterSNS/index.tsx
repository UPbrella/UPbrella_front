import message from "@/assets/message.svg";
import instagram from "@/assets/instagram.svg";

const FooterSns = () => {
  return (
    <div className="flex items-center gap-x-3 ">
      <div className="text-sm text-gray-500">FOLLOW US</div>
      <a
        className="flex items-center justify-center w-40 h-40 bg-kakao rounded-99"
        href="https://pf.kakao.com/_sxeXFb"
      >
        <img alt="message" src={message} />
      </a>
      <a href="https://www.instagram.com/upbrella.sinchon/">
        <img className="p-8" alt="instagram" src={instagram} />
      </a>
    </div>
  );
};
export default FooterSns;
