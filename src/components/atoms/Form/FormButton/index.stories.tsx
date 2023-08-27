import FormButton from "./index";
import { FormButtonProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Form/FormButton",
  component: FormButton,
} as Meta<typeof FormButton>;

const Template: StoryFn<typeof FormButton> = (args: FormButtonProps) => <FormButton {...args} />;

export const Rent = Template.bind({});
Rent.args = {
  label: "대여하기",
};

export const Return = Template.bind({});
Return.args = {
  label: "반납하기",
};
