import i18n from "@/shared/lib/i18n";
import NhIcon from "@/shared/assets/BankIcon/nonghyub.svg";
import KakaoIcon from "@/shared/assets/BankIcon/kakaobank.svg";
import KbIcon from "@/shared/assets/BankIcon/kb.svg";
import ShinhanIcon from "@/shared/assets/BankIcon/shinhan.svg";
import WooriIcon from "@/shared/assets/BankIcon/woori.svg";
import TossbankIcon from "@/shared/assets/BankIcon/tossbank.svg";
import IbkIcon from "@/shared/assets/BankIcon/ibk.svg";
import HanaIcon from "@/shared/assets/BankIcon/hana.svg";
import MgIcon from "@/shared/assets/BankIcon/mg.svg";
import BusanIcon from "@/shared/assets/BankIcon/busan.svg";
import KbankIcon from "@/shared/assets/BankIcon/kbank.svg";
import Shinhyubcon from "@/shared/assets/BankIcon/shinhyub.svg";
import EpostIcon from "@/shared/assets/BankIcon/epost.svg";
import ScIcon from "@/shared/assets/BankIcon/sc.svg";
import DaeguIcon from "@/shared/assets/BankIcon/daegu.svg";
import GwangjuIcon from "@/shared/assets/BankIcon/gwangju.svg";
import SuhyubIcon from "@/shared/assets/BankIcon/suhyub.svg";
import FsbIcon from "@/shared/assets/BankIcon/fsb.svg";
import CitiIcon from "@/shared/assets/BankIcon/citi.svg";
import KdbIcon from "@/shared/assets/BankIcon/kdb.svg";
import NfcfIcon from "@/shared/assets/BankIcon/nfcf.svg";

export const BankIcon = {
  NH농협: <img src={NhIcon} alt={i18n.t("constants.bank.NH")} />,
  카카오뱅크: <img src={KakaoIcon} alt={i18n.t("constants.bank.kakao")} />,
  KB국민: <img src={KbIcon} alt={i18n.t("constants.bank.KB")} />,
  신한: <img src={ShinhanIcon} alt={i18n.t("constants.bank.shinhan")} />,
  우리: <img src={WooriIcon} alt={i18n.t("constants.bank.woori")} />,
  토스뱅크: <img src={TossbankIcon} alt={i18n.t("constants.bank.toss")} />,
  IBK기업: <img src={IbkIcon} alt={i18n.t("constants.bank.IBK")} />,
  하나: <img src={HanaIcon} alt={i18n.t("constants.bank.hana")} />,
  새마을: <img src={MgIcon} alt={i18n.t("constants.bank.saemaeul")} />,
  부산: <img src={BusanIcon} alt={i18n.t("constants.bank.busan")} />,
  대구: <img src={DaeguIcon} alt={i18n.t("constants.bank.daegu")} />,
  케이뱅크: <img src={KbankIcon} alt={i18n.t("constants.bank.kbank")} />,
  신협: <img src={Shinhyubcon} alt={i18n.t("constants.bank.shinhyup")} />,
  우체국: <img src={EpostIcon} alt={i18n.t("constants.bank.epost")} />,
  SC제일: <img src={ScIcon} alt={i18n.t("constants.bank.SC")} />,
  경남: <img src={BusanIcon} alt={i18n.t("constants.bank.gyeongnam")} />,
  광주: <img src={GwangjuIcon} alt={i18n.t("constants.bank.gwangju")} />,
  수협: <img src={SuhyubIcon} alt={i18n.t("constants.bank.suhyup")} />,
  전북: <img src={GwangjuIcon} alt={i18n.t("constants.bank.jeonbuk")} />,
  저축은행: <img src={FsbIcon} alt={i18n.t("constants.bank.fsb")} />,
  제주: <img src={ShinhanIcon} alt={i18n.t("constants.bank.jeju")} />,
  씨티: <img src={CitiIcon} alt={i18n.t("constants.bank.citi")} />,
  KDB산업: <img src={KdbIcon} alt={i18n.t("constants.bank.KDB")} />,
  산림조합: <img src={NfcfIcon} alt={i18n.t("constants.bank.nfcf")} />,
};
