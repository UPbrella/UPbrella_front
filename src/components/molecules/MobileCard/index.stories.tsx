import type { Meta, StoryFn } from "@storybook/react";
import MobileCard from "@/components/molecules/MobileCard/index";

export default {
  title: "molecules/MobildCardInfo",
  component: MobileCard,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = (args) => <MobileCard {...args} />;

export const Default = Template.bind({});
Default.args = {};
