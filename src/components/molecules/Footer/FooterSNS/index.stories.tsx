import { Meta, StoryFn } from "@storybook/react";
import FooterSns from ".";

export default {
  title: "molecules/FooterSns",
  component: FooterSns,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = () => <FooterSns />;

export const Default = Template.bind({});
Default.args = {};
