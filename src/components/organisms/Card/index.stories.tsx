import { Meta, StoryFn } from "@storybook/react";
import Card from ".";

export default {
  title: "organisms/Card",
  component: Card,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = () => <Card />;

export const Default = Template.bind({});
Default.args = {};
