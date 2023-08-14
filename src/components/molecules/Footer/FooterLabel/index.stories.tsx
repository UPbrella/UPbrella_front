import { Meta, StoryFn } from "@storybook/react";
import FooterLabel from ".";

export default {
  title: "molecules/FooterLabel",
  component: FooterLabel,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = () => <FooterLabel />;

export const Default = Template.bind({});
Default.args = {};
