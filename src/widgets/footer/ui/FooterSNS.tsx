import instagram from "@/shared/assets/instagram.png";
import message from "@/shared/assets/message.svg";

const FooterSns = () => {
  return (
    <div className="flex gap-x-3 items-center">
      <div className="text-sm text-gray-500">FOLLOW US</div>
      <a
        className="flex justify-center items-center w-40 h-40 bg-kakao rounded-99"
        href="https://pf.kakao.com/_sxeXFb"
      >
        <img alt="message" src={message} />
      </a>
      <a href="https://www.instagram.com/upbrella.sinchon/">
        <img className="w-32 h-32" alt="instagram" src={instagram} />
      </a>
    </div>
  );
};
export default FooterSns;
