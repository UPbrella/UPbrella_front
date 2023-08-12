import { Meta, StoryObj } from "@storybook/react";
import SelectBox from "@/components/molecules/SelectBox";

// meta
const meta = {
  title: "molecules/SelectBox",
  component: SelectBox,
} satisfies Meta<typeof SelectBox>;

export default meta;

// story type
type Story = StoryObj<typeof meta>;

// day example
const ExampleDayData = {
  name: "day",
  label: "요일 선택",
  value: "TUESDAY",
  onChange: () => {
    return;
  },
  menuItems: [
    {
      label: "월요일",
      value: "MONDAY",
    },
    {
      label: "화요일",
      value: "TUESDAY",
    },
  ],
} satisfies Story["args"];

export const ExampleDay = {
  args: {
    name: ExampleDayData.name,
    label: ExampleDayData.label,
    value: ExampleDayData.value,
    onChange: ExampleDayData.onChange,
    menuItems: ExampleDayData.menuItems,
  },
} satisfies Story;
