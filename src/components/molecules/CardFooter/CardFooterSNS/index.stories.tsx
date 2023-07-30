import { Meta, StoryFn } from "@storybook/react";
import CardFooterSns from "./CardFooterSns";

export default {
  title: "molecules/CardFooterSns",
  component: CardFooterSns,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = () => <CardFooterSns />;

export const Default = Template.bind({});
Default.args = {};
