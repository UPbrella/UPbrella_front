import RentModalStorageIssue from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/RentModalStorageIssue",
  component: RentModalStorageIssue,
} as Meta<typeof RentModalStorageIssue>;

const Template: StoryFn<typeof RentModalStorageIssue> = () => <RentModalStorageIssue />;

export const Default = Template.bind({});
Default.args = {};
