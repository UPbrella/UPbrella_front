import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Store from "@/constants/Store";
import { DAY_OF_WEEK } from "@/constants/Date";
import { TTableColumn } from "@/types/commonTypes";
import {
  TClassification,
  TStoreBusinessHours,
  TStoreDetail,
  TStoreTable,
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
    case "naverMapLink":
      formatFn = (link: string) => (
        <Button>
          <Link target="_blank" rel="noopener" to={link}>
            링크
          </Link>
        </Button>
      );
      break;
  }

  return {
    id: _key,
    label: Store.STORE_ENUM[_key],
    align: "center",
    formatFn,
  } as TTableColumn<TStoreTableKey>;
});

// api -> 테이블 형식으로 포맷팅 함수
export const getStoreTableData = (storesRes: TStoreDetail[]): TStoreTable[] => {
  return storesRes.map((e) => {
    return {
      ...e,
      address: e.addressDetail ? `${e.address}, ${e.addressDetail}` : e.address,
      naverMapLink: `https://map.naver.com/v5/search/${e.address}?c=15,0,0,0,dh`,
    };
  });
};
