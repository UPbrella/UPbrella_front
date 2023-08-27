import { Button } from "@mui/material";
import Store from "@/constants/Store";
import { DAY_OF_WEEK } from "@/constants/Date";
import { TTableColumn } from "@/types/commonTypes";
import {
  TClassification,
  TStoreBusinessHours,
  TStoreTableKey,
  TSubClassification,
} from "@/types/admin/StoreTypes";

// 협업지점 테이블 Column 생성
export const StoreTableColumns = Object.keys(Store.STORE_ENUM).map((key) => {
  const _key = key as TStoreTableKey;

  // format 함수
  let formatFn;

  switch (_key) {
    case "activateStatus":
      formatFn = (status: boolean) => (status ? "Y" : "N");
      break;
    case "businessHours":
      formatFn = (hours: TStoreBusinessHours[]) => (
        <>
          {hours.map(({ date, openAt, closeAt }) => (
            <div key={date}>{`${DAY_OF_WEEK[date]} : ${openAt} ~ ${closeAt}`}</div>
          ))}
        </>
      );
      break;
    case "classification":
      formatFn = (value: TClassification) => {
        return <>{value.name}</>;
      };
      break;
    case "subClassification":
      formatFn = (value: TSubClassification) => {
        return <>{value.name}</>;
      };
      break;
    case "imageUrls":
      formatFn = () => <Button variant="contained">이미지 업로드 및 확인</Button>;
      break;
  }

  return {
    id: _key,
    label: Store.STORE_ENUM[_key],
    align: "center",
    formatFn,
  } as TTableColumn<TStoreTableKey>;
});
