import { DEFAULT_COORDINATE } from "@/components/pages/admin/store/UI/StoreAddressInput";
import {
  TAdminStoreDetail,
  TStoreParams,
  TClassification,
  TClassificationParams,
  TSubClassification,
  TSubClassificationParams,
  TStoreTableData,
} from "@/types/admin/StoreTypes";
import { toast } from "react-hot-toast";

// 협업지점 추가 시, 초기값 설정
export const storeInitializer = (res?: TAdminStoreDetail): TStoreParams => {
  if (res) {
    const {
      activateStatus,
      address,
      addressDetail,
      businessHour,
      businessHours,
      category,
      classification,
      content,
      latitude,
      longitude,
      name,
      subClassification,
      umbrellaLocation,
      contactNumber,
      instagramId,
      password,
    } = res;

    return {
      name,
      category,
      classificationId: classification.id,
      subClassificationId: subClassification.id,
      activateStatus,
      address,
      addressDetail,
      umbrellaLocation,
      businessHour,
      contactNumber,
      instagramId,
      latitude,
      longitude,
      content,
      businessHours,
      password,
    } satisfies TStoreParams;
  }

  return {
    name: "",
    category: "",
    classificationId: null,
    subClassificationId: null,
    activateStatus: false,
    address: "",
    addressDetail: "",
    umbrellaLocation: "",
    businessHour: "",
    contactNumber: "",
    instagramId: "",
    latitude: null,
    longitude: null,
    content: "",
    businessHours: [],
    password: "",
  } satisfies TStoreParams;
};

// input을 영업시간에 맞춰 filter 하는 함수 -> HH:mm, jest 필요
export const getFilterBusinessTime = (prevInput: string, currInput: string) => {
  const timeRegex = /^[0-9:]*$/;
  if (currInput === "") return "";

  if (!timeRegex.test(currInput)) return;

  const prevLen = prevInput?.length;
  const currLen = currInput?.length;

  if (currLen > 5) return;

  if (currInput.includes(":")) {
    const [h, m] = currInput.split(":");
    if (+h > 23) {
      return `23:${m}`;
    }
    if (+m > 59) {
      return `${h}:59`;
    }
  }
  if (prevLen === 0 && currLen === 1) {
    if (+currInput > 2) return `0${currInput}:`;
  }
  if (prevLen === 1 && currLen === 2) {
    if (prevInput) return `${currInput}:`;
  }
  if (prevLen === 2 && currLen === 3 && !currInput.includes(":")) {
    if (prevInput) return `${currInput.slice(0, 2)}:${currInput.slice(2)}`;
  }
  return currInput;
};

// 대분류 state 설정
export const ClassificationTagInitializer = (res?: TClassification): TClassificationParams => {
  if (res) {
    const { latitude, longitude, name } = res;
    return { latitude, longitude, name } satisfies TClassificationParams;
  }

  return {
    latitude: DEFAULT_COORDINATE.lat,
    longitude: DEFAULT_COORDINATE.lng,
    name: "",
  } satisfies TClassificationParams;
};

// 소분류 state 설정
export const subClassificationTagInitializer = (
  res?: TSubClassification
): TSubClassificationParams => {
  if (res) {
    const { name } = res;
    return { name } satisfies TSubClassificationParams;
  }

  return {
    name: "",
  } satisfies TSubClassificationParams;
};

export const createClassificationsOptions = (res?: TClassification[] | TSubClassification[]) => {
  if (!res) return [];

  return res.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};

export const isValidateStoreSave = (params: TStoreParams) => {
  const {
    name,
    address,
    businessHour,
    businessHours,
    category,
    classificationId,
    subClassificationId,
    umbrellaLocation,
    longitude,
    latitude,
  } = params;

  if (
    !name ||
    !address ||
    !businessHour ||
    !businessHours ||
    !category ||
    !classificationId ||
    !subClassificationId ||
    !umbrellaLocation ||
    !longitude ||
    !latitude
  ) {
    toast.error("필수값을 입력해주세요.");
    return false;
  }

  return true;
};

export const filterStoreTableView = ({
  id,
  name,
  category,
  activateStatus,
  address,
  umbrellaLocation,
  businessHour,
  contactNumber,
  instagramId,
  content,
  imageUrls,
}: TAdminStoreDetail): TStoreTableData => {
  return {
    id,
    name,
    category,
    activateStatus,
    address,
    umbrellaLocation,
    businessHour,
    contactNumber,
    instagramId,
    content: content.length > 50 ? `${content.slice(0, 50)}...` : content,
    imageUrls,
  };
};
