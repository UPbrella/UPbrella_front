import { Meta, StoryFn } from "@storybook/react";
import CardFooterLabel from "./CardFooterLabel";

export default {
  title: "molecules/CardFooterLabel",
  component: CardFooterLabel,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = () => <CardFooterLabel />;

export const Default = Template.bind({});
Default.args = {};
