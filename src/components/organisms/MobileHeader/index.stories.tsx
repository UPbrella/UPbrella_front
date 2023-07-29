import MobileHeader from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "organisms/MobileHeader",
  component: MobileHeader,
} as Meta;

const Template: StoryFn = () => <MobileHeader />;

export const Default = Template.bind({});
Default.args = {};
