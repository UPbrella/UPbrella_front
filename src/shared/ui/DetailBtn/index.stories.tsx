import { Meta, StoryFn } from "@storybook/react";
import DetailBtn, { TDetailBtn } from ".";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "atoms/DetailBtn",
  component: DetailBtn,
  tags: ["autodocs"],
} as Meta;

// Story 함수의 타입 정의
const Template: StoryFn<TDetailBtn> = (args) => (
  <Router>
    <DetailBtn {...args} />
  </Router>
);

export const Default = Template.bind({});
