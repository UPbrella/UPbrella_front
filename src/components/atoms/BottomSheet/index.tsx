import { useRef, useEffect } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";

export type BottomSheetProps = {
  children: JSX.Element;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (value: boolean) => void;
  snapPoints: number[];
  _className?: string;
};

const BottomSheet = ({
  children,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  snapPoints,
  _className,
}: BottomSheetProps) => {
  const ref = useRef<SheetRef>();
  const contentRef = useRef<HTMLDivElement>(null);
  const snapTo = (i: number) => ref.current?.snapTo(i);

  // 외부 클릭 시 바텀시트 닫기
  const handleOutsideClick = (event: MouseEvent) => {
    if (!contentRef.current?.contains(event.target as Node)) {
      setIsBottomSheetOpen(false);
    }
  };

  useEffect(() => {
    if (isBottomSheetOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <Sheet
      ref={ref}
      isOpen={isBottomSheetOpen}
      onClose={() => setIsBottomSheetOpen(false)}
      snapPoints={snapPoints}
      initialSnap={1}
      className={_className}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div ref={contentRef} style={{ overflow: "scroll" }} onScroll={() => snapTo(0)}>
            {children}
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default BottomSheet;
