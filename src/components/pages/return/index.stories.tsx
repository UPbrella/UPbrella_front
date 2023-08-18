import React from "react";
import ReturnPage from ".";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "page/Return",
  component: ReturnPage,
} as Meta;

const Template: StoryFn<typeof ReturnPage> = () => <ReturnPage />;

export const Default = Template.bind({});
Default.args = {};
