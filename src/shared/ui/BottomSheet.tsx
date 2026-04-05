import { useRef } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";

type BottomSheetProps = {
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
  const snapTo = (i: number) => ref.current?.snapTo(i);
  const mountKeyRef = useRef(0);
  const prevOpenRef = useRef(false);

  if (isBottomSheetOpen && !prevOpenRef.current) {
    mountKeyRef.current += 1;
  }
  prevOpenRef.current = isBottomSheetOpen;

  return (
    <Sheet
      key={mountKeyRef.current}
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
          <div style={{ overflow: "auto" }} onScroll={() => snapTo(0)}>
            {children}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => setIsBottomSheetOpen(false)} />
    </Sheet>
  );
};

export default BottomSheet;
