import { Meta, StoryFn } from "@storybook/react";
import RentalLocationBtn, { TRentalLocationBtn } from "@/components/atoms/RentalLocationBtn/index";

export default {
  title: "Example/RentalLocationBtn",
  component: RentalLocationBtn,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<TRentalLocationBtn> = (args) => <RentalLocationBtn {...args} />;

export const Default = Template.bind({});
Default.args = { text: ["신촌", "연희동"] };
