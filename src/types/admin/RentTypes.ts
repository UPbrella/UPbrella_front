export type TRentHistory = {
  id: number;
  name: string;
  phoneNumber: string;
  rentStoreName: string; // 대여 지점
  rentAt: string; // 대여 시간
  elapsedDay: number; // 대여 기간
  umbrellaUuid: number;
  returnStoreName?: string; // 반납 지점
  returnAt: string; //반납 시간
  totalRentalDay: number; //총 대여 기간
  refundCompleted: boolean; // 보증금 환급 여부
  paid: boolean; // 보증금 입금 여부
  bank: string; // 환급 은행
  accountNumber: string; // 환급 계좌
  etc?: string; // 비고
};

export type TRentHistoriesRes = {
  rentalHistoryResponsePage: TRentHistory[];
  countOfAllHistories: number;
  countOfAllPages: number;
};

export type TRentHistoriesParams = {
  refunded: TRefundedStatus; // 환급 여부 정렬, 없으면 모두
  page?: number;
  size?: number;
};

export type TRefundedStatus = "all" | "done" | "notDone";
