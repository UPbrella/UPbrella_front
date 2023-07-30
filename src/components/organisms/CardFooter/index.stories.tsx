import { Meta, StoryFn } from "@storybook/react";
import CardFooter from ".";

export default {
  title: "organisms/CardFooter",
  component: CardFooter,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = () => <CardFooter />;

export const Default = Template.bind({});
Default.args = {};
