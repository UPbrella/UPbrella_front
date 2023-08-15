import { useRef } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";

export type BottomSheetProps = {
  children: JSX.Element;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (value: boolean) => void;
};

const BottomSheet = ({ children, isBottomSheetOpen, setIsBottomSheetOpen }: BottomSheetProps) => {
  const ref = useRef<SheetRef>();

  return (
    <Sheet
      ref={ref}
      isOpen={isBottomSheetOpen}
      onClose={() => setIsBottomSheetOpen(false)}
      snapPoints={[484, 272, 100, 0]}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div style={{ overflow: "scroll" }}>{children}</div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default BottomSheet;
