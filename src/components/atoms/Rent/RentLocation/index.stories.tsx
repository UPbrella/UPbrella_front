import RentLocation from "./index";
import { RentLocationProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Rent/RentLocation",
  component: RentLocation,
} as Meta<typeof RentLocation>;

const Template: StoryFn<typeof RentLocation> = (args: RentLocationProps) => (
  <RentLocation {...args} />
);

export const Title = Template.bind({});
Title.args = {
  label: "지역",
  isTitle: true,
};

export const StoreName = Template.bind({});
StoreName.args = {
  label: "대여지점",
};
