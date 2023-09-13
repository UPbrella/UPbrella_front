import type { Meta, StoryFn } from "@storybook/react";
import MobileCardInfo from "@/components/atoms/MobileCardInfo/index";

export default {
  title: "atoms/MobildCardInfo",
  component: MobileCardInfo,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = (args) => <MobileCardInfo {...args} />;

export const Default = Template.bind({});
Default.args = {};
