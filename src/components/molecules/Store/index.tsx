import { TStoreListAll, TSubClassification } from "@/types/admin/StoreTypes";
import { useEffect, useRef } from "react";

export type TStoreProps = {
  storeList: TStoreListAll[];
  setIsMobileCardOpen: (open: boolean) => void;
  classifications?: TSubClassification[];
  setSelectedStoreId?: (storeId: number) => void;
  selectedClassificationId?: number;
  selectedClassificationName?: string; // 선택한 분류 이름을 받음
  setIsMobile?: (isMobile: boolean) => void;
};

const Store = ({
  storeList,
  setIsMobileCardOpen,
  classifications,
  setSelectedStoreId,
  selectedClassificationName,
  setIsMobile,
}: TStoreProps) => {
  const classificationRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (selectedClassificationName && classifications) {
      const index = classifications.findIndex(
        (classification) => classification.name === selectedClassificationName
      );
      if (index !== -1 && classificationRefs.current[index]) {
        const element = classificationRefs.current[index];
        if (element) {
          element.scrollIntoView({ behavior: "smooth" }); // 스무스한 스크롤
        }
      }
    }
  }, [selectedClassificationName, classifications]);

  return (
    <div className="flex flex-col justify-center items-start smMaxLg:items-center">
      {storeList.map((store, index) => (
        <div key={index}>
          <div
            ref={(el) => (classificationRefs.current[index] = el)}
            className="font-bold text-24 mt-64 ml-5 mb-16"
          >
            {classifications
              ? classifications.find(
                  (classification) => classification.id === store.subClassificationId
                )?.name
              : ""}
          </div>
          <div className="grid grid-cols-3 grid-flow-row gap-4 lg:grid-cols-2 mdMaxlg:grid-cols-2">
            {store.stores.map((storeItem, itemIndex) => (
              <div
                className="flex mb-12"
                key={itemIndex}
                onClick={() => {
                  if (storeItem && storeItem.id && setSelectedStoreId) {
                    setSelectedStoreId(storeItem.id);
                  }
                  if (window.innerWidth <= 360) {
                    setIsMobileCardOpen(true);
                    setIsMobile?.(true);
                  } else if (window.innerWidth <= 1024) {
                    setIsMobileCardOpen(true);
                    setIsMobile?.(false);
                  }
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  {storeItem.thumbnail ? (
                    <img
                      src={`${storeItem.thumbnail}`}
                      alt="Image"
                      className="w-248 h-174 rounded-12 sm:w-152 sm:h-106 smMaxLg:h-204 smMaxLg:w-292"
                    />
                  ) : (
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATcAAACiCAMAAAATIHpEAAAAwFBMVEUNDQ3///9UxQMAAAAICAhdXV1RvwMYGBjr6+sAAA3Ly8vBwcHd3d2ampqsrKyAgIBWywFlZWWOjo4uZwn4+Ph0dHTQ0NAwbQkycgmPj481NTWhoaHm5uaysrLy8vLW1tZPT09FwQBlyTE2ewg4gAglJSUsLCw/Pz9FRUUbGxt4eHhMTExXV1dsbGwrXwlyzULY8cjQ7rvi9dS15Jru+eaH1VlgyCOY2XfF6q9wzT/v+eeq4IyC0lna8c6t4JaK1WYVU2AwAAADtklEQVR4nO3b21baQBSAYchQMVJEEbCAVEMVPHNQDtbT+79VgUJmBwYySS+Q5v/W6kUHajP/2gECmEoBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEn5TGuZ7R3YF1ctzlX9JVVYLFZrhDPKpNK+m0Uj9dNf+6Y2/vPEkt2yfrd9uoWgWzx0i4du8dAtHrrFQ7d46BZPYrtl/u0iMiHdVPAqfNrsqnWVXW2nTJfrhtVkdFP1w7lGW01GrX14NttdqVLMBjao8v4dr/UN6r6xWC3OVxPSTV5wK3Wo95wuFeTIqe/+DceiW8FfPUhWN7mhmv7LTE6Eo1uA2NB9u5RekhOF6CbJDelT1lf0N0m3ALGhpZN0pnS12CXdApSplpCnm1FYt326GYV1S7fm26RbQLDbwUMtWyufy6UC3UwC3crTq6vJn6pYq9PNRHYr+I9lDb3YoJuJ2NCZfq12o7eeo5uJ2FBd5NAPcXQzEhsqixz6RKWbkXlDqk63zdZ0y9NtM7rFQ7d46BZPnG4P4o5Full3KxifeOkW1u1Q3DFHN+tu+oIso/RHEnQzd6voHLdq9X50S5m7Hegcpdb00/mMUsd6jW4pczf5kXQ631ZKXTTkEt3M3W7TAaWfS5+20s3crZXejG7GbvI9ObpF6VY21eJ1SFi3wCuRhTOuT8O73ax876bUoltot5S6Xgq3307u+yHGX9Qzd5tMXOBUzU1ewyW2W+5grnIn31arLFbrcptK3fsX8rkLlUmph5U7ZlLn/o/U3fR/c/FfdLP+urO+oVYuFgt3+nvUy3fMmH63ee0PTI5k7x4AAAAAEsjd9gHsJvdk20ewk9wTZ9uHsIvcx6O9bR/DDppkc+gWmXty5NAtsum00S2y2bTRLaq/00a3iObTRrdo/Gx0i0Jno1sE7qmfjW72xLTRzZ6cNrpZC0wb3WwFp41ulpaz0c3KSja62VjNRjcLhmx0C+f+WM1Gt1Bi2rwO3WzpafO6nZ7n0c2KyNbv9PvdJ7rZEI9tXvO5+TwY0s2CzDYav/weNHl8syCfSYev3f4bzws23F86m/fe7PX8aZvY9sF9XfIkHfSePj9EtqPTbR/dlxV4bOv0xj1PZuP7SGvIk/Rz1HseOGSzoKet6Y2euqO3F7JZ0NPmvb9+fAzH8iQ9Idsa8iQddkfj7pBpsyCyea+j5vsn02ZDTpsz6vc7e2SzEMjmeM7YIZsF99LwNiXZwgSnjWyWmLZYmLZYNk7bI9nWIFss7qWzt46znO0P0C5RpYuDlLsAAAAASUVORK5CYII="
                      alt="Image"
                      className="w-248 h-174 rounded-12 sm:w-152 sm:h-106 smMaxLg:h-204 smMaxLg:w-292"
                    />
                  )}
                  <div className="text-gray-700 text-16 font-semibold mt-12">{storeItem.name}</div>
                  <div className="text-gray-600 text-12">{storeItem.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Store;
