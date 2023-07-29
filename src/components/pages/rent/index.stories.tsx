import React from "react";
import RentPage from ".";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "page/Rent",
  component: RentPage,
} as Meta;

const Template: StoryFn<typeof RentPage> = () => <RentPage />;

export const Default = Template.bind({});
Default.args = {};
