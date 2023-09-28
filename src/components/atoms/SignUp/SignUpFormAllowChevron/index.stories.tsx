import SignUpFormAllowChevron from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpFormAllowChevron",
  component: SignUpFormAllowChevron,
} as Meta<typeof SignUpFormAllowChevron>;

const Template: StoryFn<typeof SignUpFormAllowChevron> = (args) => (
  <SignUpFormAllowChevron {...args} />
);

export const Clicked = Template.bind({});
Clicked.args = {};

export const NotClicked = Template.bind({});
NotClicked.args = {};
