import ContentsTitle from "@/components/molecules/ContentsTitle";
import { Button } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ContentsTitle,
  title: "molecules/ContentsTitle",
} satisfies Meta<typeof ContentsTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "타이틀입니다." },
};

export const WithChildrenButton: Story = {
  args: {
    title: "협업지점 목록",
    children: <Button variant="contained">추가</Button>,
  },
};
