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
  }

  // 지도 링크
  // if (_key === "naverMapLink") {
  //   formatFn = (link: string) => (
  //     <Link target="_blank" rel="noopener" href={link}>
  //       링크
  //     </Link>
  //   );
  // }

  // 이미지 현재는 텍스트만 return
  // if (_key === "images") {
  //   formatFn = (imgStrList: string[]) => (
  //     <div>
  //       {imgStrList.map((e) => (
  //         <div key={e}>{e}</div>
  //       ))}
  //     </div>
  //   );
  // }

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
      // TODO: 네이버 주소랑, 이미지 테이블에서 조회할 때, 어떻게 할지 고민
      naverMapLink: `https://map.naver.com/v5/search/${e.address}?c=15,0,0,0,dh`,
      images: e.imageUrls.map((e) => {
        return e.imagesUrl;
      }),
    };
  });
};
