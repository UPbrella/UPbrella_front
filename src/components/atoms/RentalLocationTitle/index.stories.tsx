import { Meta, StoryFn } from "@storybook/react";
import RentalLocationTitle, { TRentalLocationTitle } from ".";

export default {
  title: "Example/RentalLocationTitle",
  component: RentalLocationTitle,
} as Meta;

const Template: StoryFn<TRentalLocationTitle> = (args) => <RentalLocationTitle {...args} />;

export const Default = Template.bind({});
Default.args = { title: "모티스 스터디카페", category: "카페, 디저트" };
