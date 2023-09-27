import message from "@/assets/message.svg";
import instagram from "@/assets/instagram.svg";

const FooterSns = () => {
  return (
    <div className="flex items-center gap-x-3 py-20">
      <div className="text-gray-500 text-sm">FOLLOW US</div>
      <a
        className="bg-kakao rounded-99 w-40 h-40 flex justify-center items-center"
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
