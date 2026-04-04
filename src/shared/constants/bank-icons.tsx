import type { TFunction } from "i18next";
import type ko from "@/shared/lib/i18n/locales/ko.json";

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

type TI18nKey = keyof typeof ko;

export type TBank = {
  apiKey: string;
  labelKey: TI18nKey;
  icon: string;
};

export const BANKS: TBank[] = [
  { apiKey: "NH농협", labelKey: "constants.bank.NH", icon: NhIcon },
  { apiKey: "카카오뱅크", labelKey: "constants.bank.kakao", icon: KakaoIcon },
  { apiKey: "KB국민", labelKey: "constants.bank.KB", icon: KbIcon },
  { apiKey: "신한", labelKey: "constants.bank.shinhan", icon: ShinhanIcon },
  { apiKey: "우리", labelKey: "constants.bank.woori", icon: WooriIcon },
  { apiKey: "토스뱅크", labelKey: "constants.bank.toss", icon: TossbankIcon },
  { apiKey: "IBK기업", labelKey: "constants.bank.IBK", icon: IbkIcon },
  { apiKey: "하나", labelKey: "constants.bank.hana", icon: HanaIcon },
  { apiKey: "새마을", labelKey: "constants.bank.saemaeul", icon: MgIcon },
  { apiKey: "부산", labelKey: "constants.bank.busan", icon: BusanIcon },
  { apiKey: "대구", labelKey: "constants.bank.daegu", icon: DaeguIcon },
  { apiKey: "케이뱅크", labelKey: "constants.bank.kbank", icon: KbankIcon },
  { apiKey: "신협", labelKey: "constants.bank.shinhyup", icon: Shinhyubcon },
  { apiKey: "우체국", labelKey: "constants.bank.epost", icon: EpostIcon },
  { apiKey: "SC제일", labelKey: "constants.bank.SC", icon: ScIcon },
  { apiKey: "경남", labelKey: "constants.bank.gyeongnam", icon: BusanIcon },
  { apiKey: "광주", labelKey: "constants.bank.gwangju", icon: GwangjuIcon },
  { apiKey: "수협", labelKey: "constants.bank.suhyup", icon: SuhyubIcon },
  { apiKey: "전북", labelKey: "constants.bank.jeonbuk", icon: GwangjuIcon },
  { apiKey: "저축은행", labelKey: "constants.bank.fsb", icon: FsbIcon },
  { apiKey: "제주", labelKey: "constants.bank.jeju", icon: ShinhanIcon },
  { apiKey: "씨티", labelKey: "constants.bank.citi", icon: CitiIcon },
  { apiKey: "KDB산업", labelKey: "constants.bank.KDB", icon: KdbIcon },
  { apiKey: "산림조합", labelKey: "constants.bank.nfcf", icon: NfcfIcon },
];

const bankLabelMap = new Map(BANKS.map((b) => [b.apiKey, b.labelKey]));

export function getBankDisplayName(apiKey: string, t: TFunction): string {
  const labelKey = bankLabelMap.get(apiKey);
  return labelKey ? t(labelKey) : apiKey;
}
