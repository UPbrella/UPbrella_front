import FormLocation from "./index";
import { FormLocationProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Form/FormLocation",
  component: FormLocation,
} as Meta<typeof FormLocation>;

const Template: StoryFn<typeof FormLocation> = (args: FormLocationProps) => (
  <FormLocation {...args} />
);

export const Title = Template.bind({});
Title.args = {
  label: "지역",
  isTitle: true,
};

export const RentStoreName = Template.bind({});
RentStoreName.args = {
  label: "대여지점",
};

export const ReturnStoreName = Template.bind({});
ReturnStoreName.args = {
  label: "반납지점",
};
