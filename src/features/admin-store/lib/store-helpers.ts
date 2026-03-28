import { DEFAULT_COORDINATE } from "@/shared/constants/map";
import {
  TAdminStoreDetail,
  TStoreParams,
  TClassification,
  TClassificationParams,
  TSubClassification,
  TStoreTableData,
} from "@/entities/store/model/types";
import { toast } from "react-hot-toast";
import i18n from "@/shared/lib/i18n";

export const storeInitializer = (res?: TAdminStoreDetail): TStoreParams => {
  if (res) {
    const {
      address,
      addressDetail,
      businessHour,
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
    } = res;

    return {
      name,
      category,
      classificationId: classification.id,
      subClassificationId: subClassification.id,
      address,
      addressDetail,
      umbrellaLocation,
      businessHour,
      contactNumber,
      instagramId,
      latitude,
      longitude,
      content,
      businessHours: [],
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
    businessHour: i18n.t("admin.store.defaultBusinessHour"),
    contactNumber: "",
    instagramId: "",
    latitude: null,
    longitude: null,
    content: "",
    businessHours: [],
  } satisfies TStoreParams;
};

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
    !category ||
    !classificationId ||
    !subClassificationId ||
    !umbrellaLocation ||
    !longitude ||
    !latitude
  ) {
    toast.error(i18n.t("admin.common.requiredError"));
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
  };
};
