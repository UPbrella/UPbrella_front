import Store from "@/constants/Store";
import { TStoreDetail, TStoreTable, TStoreTableKey } from "@/types/admin/StoreTypes";
import { TTableColumn } from "@/types/commonTypes";
import { Link } from "@mui/material";

// 협업지점 테이블 Column 생성
export const StoreTableColumns = Object.keys(Store.STORE_ENUM).map((key) => {
  const _key = key as TStoreTableKey;

  // format 함수
  let formatFn;

  // 활성 true일 때 Y, false 면 N
  if (_key === "activateStatus") {
    formatFn = (status: boolean) => (status ? "Y" : "N");
  }

  // 지도 링크
  if (_key === "naverMapLink") {
    formatFn = (link: string) => (
      <Link target="_blank" rel="noopener" href={link}>
        링크
      </Link>
    );
  }

  // 이미지 현재는 텍스트만 return
  if (_key === "images") {
    formatFn = (imgStrList: string[]) => (
      <div>
        {imgStrList.map((e) => (
          <div key={e}>{e}</div>
        ))}
      </div>
    );
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
  return storesRes.map(
    ({
      activateStatus,
      address,
      businessHours,
      classification,
      contactNumber,
      coordinate,
      imageUrls,
      instagramId,
      name,
      umbrellaLocation,
    }) => {
      return {
        activateStatus,
        address,
        businessHours,
        classification,
        contactNumber,
        coordinate,
        instagramId,
        name,
        umbrellaLocation,
        naverMapLink: `https://map.naver.com/v5/search/${address}?c=15,0,0,0,dh`,
        images: imageUrls.map((e) => {
          const parts = e.split("com/");
          if (parts.length >= 2) {
            const imageName = parts[1].split(".jpg")[0];
            return `com/${imageName}.jpg`;
          }
          return "";
        }),
      };
    }
  );
};
