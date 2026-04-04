import type { TApiResponse } from "@/shared/model/types";
import type { TUserRes, TBlackUserRes } from "@/entities/user/model/types";
import type { TRentHistoriesRes as TClientRentHistoryItem } from "@/entities/user/api/user-api";
import type { TSocialUserSession } from "@/features/auth/model/signup-types";
import type {
  TStoreAllRes,
  TClassificationAllRes,
  TSubClassificationAllRes,
  TClassificationAllStore,
  TStoreListDetail,
  TStoreListRes,
  TStoreBusinessHoursRes,
  TStoreImageRes,
} from "@/entities/store/model/types";
import type { TUmbrellaRes, TUmbrellaStatisticsRes } from "@/entities/umbrella/model/types";
import type { TRentHistoriesRes as TAdminRentHistoriesRes } from "@/entities/rent/model/types";
import type { TConditionRes, TImprovementRes } from "@/entities/feedback/model/types";
import type { TLockersRes } from "@/entities/locker/model/types";
import type {
  TRentFormData,
  TReturnFormData,
  TReturnUmbrella,
  TRentPassword,
} from "@/features/rent-form/model/types";

const wrap = <T>(data: T): TApiResponse<T> => ({
  status: "success",
  code: 200,
  message: "OK",
  data,
});

// ── User ──

export const mockUserStatus = wrap({
  id: 1,
  name: "테스트 관리자",
  phoneNumber: "010-1234-5678",
  bank: "카카오뱅크",
  accountNumber: "3333-01-1234567",
  adminStatus: true,
  email: "admin@upbrella.co.kr",
  createdAt: "2024-01-15 10:00:00",
} satisfies TUserRes);

export const mockUsers = wrap({
  users: [
    {
      id: 1,
      name: "테스트 관리자",
      phoneNumber: "010-1234-5678",
      bank: "카카오뱅크",
      accountNumber: "3333-01-1234567",
      adminStatus: true,
      email: "admin@upbrella.co.kr",
      createdAt: "2024-01-15 10:00:00",
    },
    {
      id: 2,
      name: "김업브",
      phoneNumber: "010-2222-3333",
      bank: "신한은행",
      accountNumber: "110-123-456789",
      adminStatus: false,
      email: "user1@test.com",
      createdAt: "2024-03-10 14:30:00",
    },
    {
      id: 3,
      name: "이우산",
      phoneNumber: "010-4444-5555",
      bank: "국민은행",
      accountNumber: "012-34-5678901",
      adminStatus: false,
      email: "user2@test.com",
      createdAt: "2024-05-20 09:15:00",
    },
  ],
} satisfies { users: TUserRes[] });

export const mockBlackUsers = wrap({
  blackList: [
    { id: 10, blockedAt: "2024-06-01 12:00:00" },
    { id: 11, blockedAt: "2024-07-15 18:30:00" },
  ],
} satisfies { blackList: TBlackUserRes[] });

export const mockRentHistoriesClient = wrap({
  histories: [
    {
      isRefunded: true,
      isReturned: true,
      rentedAt: "2024-08-01 09:00:00",
      rentedStore: "스타벅스 강남점",
      returnAt: "2024-08-03 15:00:00",
      umbrellaUuid: 101,
    },
    {
      isRefunded: false,
      isReturned: false,
      rentedAt: "2024-09-10 11:30:00",
      rentedStore: "투썸 홍대점",
      returnAt: "",
      umbrellaUuid: 205,
    },
  ],
} satisfies { histories: TClientRentHistoryItem[] });

export const mockSocialSession = wrap({
  name: "테스트유저",
  email: "test@kakao.com",
  provider: "kakao",
} satisfies TSocialUserSession);

// ── Store ──

export const mockStores = wrap({
  stores: [
    {
      id: 1,
      name: "스타벅스 강남점",
      category: "카페",
      classification: {
        id: 1,
        type: "CLASSIFICATION",
        name: "강남",
        latitude: 37.4979,
        longitude: 127.0276,
      },
      subClassification: { id: 1, type: "SUB_CLASSIFICATION", name: "카페" },
      activateStatus: true,
      address: "서울시 강남구 테헤란로 123",
      addressDetail: "1층",
      umbrellaLocation: "입구 오른쪽",
      businessHour: "09:00 ~ 22:00",
      contactNumber: "02-1234-5678",
      instagramId: "upbrella_gangnam",
      latitude: 37.4979,
      longitude: 127.0276,
      content: "테스트 지점입니다.",
    },
    {
      id: 2,
      name: "투썸플레이스 홍대점",
      category: "카페",
      classification: {
        id: 2,
        type: "CLASSIFICATION",
        name: "홍대",
        latitude: 37.5563,
        longitude: 126.9236,
      },
      subClassification: { id: 1, type: "SUB_CLASSIFICATION", name: "카페" },
      activateStatus: true,
      address: "서울시 마포구 와우산로 123",
      addressDetail: "지하 1층",
      umbrellaLocation: "카운터 옆",
      businessHour: "08:00 ~ 23:00",
      contactNumber: "02-9876-5432",
      instagramId: "upbrella_hongdae",
      latitude: 37.5563,
      longitude: 126.9236,
      content: "홍대점입니다.",
    },
    {
      id: 3,
      name: "이디야 성수점",
      category: "카페",
      classification: {
        id: 3,
        type: "CLASSIFICATION",
        name: "성수",
        latitude: 37.5443,
        longitude: 127.056,
      },
      subClassification: { id: 1, type: "SUB_CLASSIFICATION", name: "카페" },
      activateStatus: false,
      address: "서울시 성동구 성수이로 77",
      addressDetail: "2층",
      umbrellaLocation: "출입문 옆 우산꽂이",
      businessHour: "07:00 ~ 22:00",
      contactNumber: "02-5555-6666",
      instagramId: "",
      latitude: 37.5443,
      longitude: 127.056,
      content: "성수점입니다.",
    },
  ],
} satisfies TStoreAllRes);

export const mockClassifications = wrap({
  classifications: [
    { id: 1, type: "CLASSIFICATION", name: "강남", latitude: 37.4979, longitude: 127.0276 },
    { id: 2, type: "CLASSIFICATION", name: "홍대", latitude: 37.5563, longitude: 126.9236 },
    { id: 3, type: "CLASSIFICATION", name: "성수", latitude: 37.5443, longitude: 127.056 },
  ],
} satisfies TClassificationAllRes);

export const mockSubClassifications = wrap({
  subClassifications: [
    { id: 1, type: "SUB_CLASSIFICATION", name: "카페" },
    { id: 2, type: "SUB_CLASSIFICATION", name: "음식점" },
    { id: 3, type: "SUB_CLASSIFICATION", name: "편의점" },
  ],
} satisfies TSubClassificationAllRes);

export const mockClassificationStores = wrap({
  stores: [
    {
      id: 1,
      name: "스타벅스 강남점",
      openStatus: true,
      latitude: 37.4979,
      longitude: 127.0276,
      rentableUmbrellasCount: 5,
    },
    {
      id: 2,
      name: "투썸플레이스 홍대점",
      openStatus: true,
      latitude: 37.5563,
      longitude: 126.9236,
      rentableUmbrellasCount: 3,
    },
  ],
} satisfies TClassificationAllStore);

export const mockStoreDetail = wrap({
  id: 1,
  name: "스타벅스 강남점",
  category: "카페",
  availableUmbrellaCount: 5,
  openStatus: true,
  businessHours: "09:00 ~ 22:00",
  contactNumber: "02-1234-5678",
  instaUrl: "https://instagram.com/upbrella_gangnam",
  address: "서울시 강남구 테헤란로 123",
  umbrellaLocation: "입구 오른쪽",
  description: "테스트 지점입니다.",
  latitude: 37.4979,
  longitude: 127.0276,
  imageUrls: ["https://via.placeholder.com/400x300?text=Store+Image+1"],
} satisfies TStoreListDetail);

export const mockStoreList = wrap({
  storesByClassification: [
    {
      subClassificationId: 1,
      stores: [
        {
          id: 1,
          thumbnail: "https://via.placeholder.com/200x200?text=Store1",
          name: "스타벅스 강남점",
          category: "카페",
        },
        {
          id: 2,
          thumbnail: "https://via.placeholder.com/200x200?text=Store2",
          name: "투썸플레이스 홍대점",
          category: "카페",
        },
      ],
    },
    {
      subClassificationId: 2,
      stores: [
        {
          id: 3,
          thumbnail: "https://via.placeholder.com/200x200?text=Store3",
          name: "이디야 성수점",
          category: "카페",
        },
      ],
    },
  ],
} satisfies TStoreListRes);

export const mockStoreBusinessHours = wrap({
  businessHours: [
    { id: 1, date: "MONDAY", openAt: "09:00", closeAt: "22:00" },
    { id: 2, date: "TUESDAY", openAt: "09:00", closeAt: "22:00" },
    { id: 3, date: "WEDNESDAY", openAt: "09:00", closeAt: "22:00" },
    { id: 4, date: "THURSDAY", openAt: "09:00", closeAt: "22:00" },
    { id: 5, date: "FRIDAY", openAt: "09:00", closeAt: "23:00" },
    { id: 6, date: "SATURDAY", openAt: "10:00", closeAt: "23:00" },
    { id: 7, date: "SUNDAY", openAt: "10:00", closeAt: "21:00" },
  ],
} satisfies { businessHours: TStoreBusinessHoursRes[] });

export const mockStoreImages = wrap({
  storeId: 1,
  images: [
    { id: 1, imageUrl: "https://via.placeholder.com/400x300?text=Image+1" },
    { id: 2, imageUrl: "https://via.placeholder.com/400x300?text=Image+2" },
  ],
} satisfies { storeId: number; images: TStoreImageRes[] });

// ── Umbrella ──

export const mockUmbrellas = wrap({
  umbrellaResponsePage: [
    { id: 1, historyId: null, storeMetaId: 1, uuid: 101, rentable: true, etc: null },
    { id: 2, historyId: 5, storeMetaId: 1, uuid: 102, rentable: false, etc: "손잡이 약간 마모" },
    { id: 3, historyId: null, storeMetaId: 2, uuid: 201, rentable: true, etc: null },
    { id: 4, historyId: null, storeMetaId: 2, uuid: 202, rentable: true, etc: null },
    { id: 5, historyId: 8, storeMetaId: 3, uuid: 301, rentable: false, etc: "천 찢어짐" },
  ],
} satisfies { umbrellaResponsePage: TUmbrellaRes[] });

export const mockUmbrellaStatistics = wrap({
  totalRentCount: 152,
  totalUmbrellaCount: 50,
  rentableUmbrellaCount: 38,
  rentedUmbrellaCount: 10,
  missingUmbrellaCount: 2,
  missingRate: 4.0,
} satisfies TUmbrellaStatisticsRes);

// ── Rent (admin) ──

export const mockRentHistories = wrap({
  rentalHistoryResponsePage: [
    {
      id: 1,
      name: "김업브",
      phoneNumber: "010-2222-3333",
      rentStoreName: "스타벅스 강남점",
      rentAt: "2024-08-01 09:00:00",
      elapsedDay: 3,
      umbrellaUuid: 101,
      returnStoreName: "투썸플레이스 홍대점",
      returnAt: "2024-08-04 14:00:00",
      totalRentalDay: 3,
      refundCompleted: true,
      paid: true,
      bank: "카카오뱅크",
      accountNumber: "3333-01-1234567",
      etc: "",
    },
    {
      id: 2,
      name: "이우산",
      phoneNumber: "010-4444-5555",
      rentStoreName: "투썸플레이스 홍대점",
      rentAt: "2024-09-10 11:30:00",
      elapsedDay: 5,
      umbrellaUuid: 205,
      returnStoreName: "",
      returnAt: "",
      totalRentalDay: 0,
      refundCompleted: false,
      paid: true,
      bank: "신한은행",
      accountNumber: "110-123-456789",
      etc: "연체 중",
    },
    {
      id: 3,
      name: "박하늘",
      phoneNumber: "010-6666-7777",
      rentStoreName: "이디야 성수점",
      rentAt: "2024-09-15 16:00:00",
      elapsedDay: 1,
      umbrellaUuid: 301,
      returnStoreName: "이디야 성수점",
      returnAt: "2024-09-16 10:00:00",
      totalRentalDay: 1,
      refundCompleted: true,
      paid: true,
      bank: "국민은행",
      accountNumber: "012-34-5678901",
      etc: "",
    },
  ],
  countOfAllHistories: 3,
  countOfAllPages: 1,
} satisfies TAdminRentHistoriesRes);

// ── Feedback ──

export const mockConditionReports = wrap({
  conditionReports: [
    { id: 1, umbrellaUuid: 102, content: "손잡이 깨짐", etc: "사용 가능하지만 교체 필요" },
    { id: 2, umbrellaUuid: 301, content: "천 찢어짐", etc: "수리 필요" },
  ],
} satisfies TConditionRes);

export const mockImprovementReports = wrap({
  improvementReports: [
    {
      id: 1,
      umbrellaUuid: 101,
      content: "QR 코드 인식이 잘 안됩니다",
      etc: "조명이 어두운 곳에서",
    },
    {
      id: 2,
      umbrellaUuid: 201,
      content: "보관함 위치를 조금 더 눈에 띄게 해주세요",
      etc: "",
    },
  ],
} satisfies TImprovementRes);

// ── Locker ──

export const mockLockers = wrap({
  lockers: [
    { id: 1, storeMetaId: 1, secretKey: "ABC123" },
    { id: 2, storeMetaId: 2, secretKey: "DEF456" },
    { id: 3, storeMetaId: 3, secretKey: "GHI789" },
  ],
} satisfies { lockers: TLockersRes[] });

// ── Rent Form ──

export const mockRentFormData = wrap({
  classificationName: "강남",
  storeMetaId: 1,
  rentStoreName: "스타벅스 강남점",
  umbrellaUuid: 101,
} satisfies TRentFormData);

export const mockReturnFormData = wrap({
  classificationName: "강남",
  rentStoreName: "스타벅스 강남점",
  storeId: 1,
} satisfies TReturnFormData);

export const mockReturnUmbrella = wrap({
  uuid: 101,
  elapsedDay: 2,
} satisfies TReturnUmbrella);

export const mockRentPassword = wrap({
  password: "1234",
} satisfies TRentPassword);

export const mockLockerCount = wrap({
  password: "5678",
} satisfies TRentPassword);
