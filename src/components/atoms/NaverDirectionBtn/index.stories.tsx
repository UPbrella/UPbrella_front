import React from "react";
import NaverDirectionBtn, { TNaverDirectionBtn } from "@/components/atoms/NaverDirectionBtn/index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Example/NaverDirectionBtn",
  component: NaverDirectionBtn,
  tags: ["autodocs"],
} as Meta;

// Story 함수의 타입 정의
const Template: StoryFn<TNaverDirectionBtn> = (args) => <NaverDirectionBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
  slon: 126.92122654,
  slat: 37.58612725,
  elon: 126.92122654,
  elat: 37.58612725,
};
