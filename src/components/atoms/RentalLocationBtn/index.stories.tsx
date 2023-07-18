import { Meta, Story } from "@storybook/react";
import RentalLocationBtn from "@/components/atoms/RentalLocationBtn/index";
import { TRentalLocationBtn } from "@/types/btn/RentalLocationBtnTypes";

export default {
  title: "Example/RentalLocationBtn",
  component: RentalLocationBtn,
  tags: ["autodocs"],
} as Meta;

const Template: Story<TRentalLocationBtn> = (args) => <RentalLocationBtn {...args} />;

export const Default = Template.bind({});
Default.args = { text: ["신촌", "연희동"] };
