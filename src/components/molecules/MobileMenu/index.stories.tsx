import { Meta, StoryFn } from "@storybook/react";
import MobileMenu, { TMenu } from ".";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Molecules/MobileMenu",
  component: MobileMenu,
  args: {
    userRes: {
      id: 10000,
      name: "테스터",
      phoneNumber: "010-1111-2222",
      bank: null,
      accountNumber: null,
      email: "tester@gmail.com",
      adminStatus: true,
    },
    setMenuOpen: () => {
      // console.log("Menu is open:");
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta;

const Template: StoryFn<TMenu> = ({ userRes, setMenuOpen }) => (
  <MobileMenu userRes={userRes} setMenuOpen={setMenuOpen} />
);

export const Default = Template.bind({});
