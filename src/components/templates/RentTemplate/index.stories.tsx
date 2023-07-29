import React from "react";
import RentTemplate from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "template/Rent",
  component: RentTemplate,
} as Meta;

const Template: StoryFn<typeof RentTemplate> = () => <RentTemplate />;

export const Default = Template.bind({});
Default.args = {};
