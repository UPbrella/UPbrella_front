export type TRentHistory = {
  id: number;
  name: string;
  phoneNumber: string;
  rentStoreName: string;
  rentAt: string;
  elapsedDay: number;
  umbrellaUuid: number;
  returnStoreName: string;
  returnAt: string;
  totalRentalDay: number;
  refundCompleted: boolean;
  etc?: string;

  // hack (추가 예정)
  // 보증금 입금 여부
  // 환급 은행
  // 환급 계좌 번호
  rentCostCompleted: boolean;
  returnBank: string;
  bankNumber: string;
};

/**
 * ex. [와이어 프레임, api]
 * [일련 번호, id] R
 * [이름, name] R
 * [전화번호 phoneNumber] R
 * [대여 지점, rentStoreName] R
 * [대여 날짜, rentAt] R
 * [우산 고유 번호, umbrellaUuid] R
 * [대여 경과 일수, elapsedDay] R filter (1~3, 4~7, 8~14, 14~)
 * [보증금 입금 여부, ?] RU filter
 * [반납 여부, ?] R filter
 * [보증금 환급 여부, refundCompleted] RU filter
 * [환급 은행, ?] R
 * [환급 계좌 번호, ?]
 * [반납 날짜, returnAt] R
 * [반납 지점, returnStoreName] R
 * [총 대여 기간, totalRentalDay] R
 * [비고, etc] RU
 */
