import { Meta, StoryFn } from "@storybook/react";
import MobileMenu, { TMenu } from ".";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Molecules/MobileMenu",
  component: MobileMenu,
  args: {
    isLogin: true,
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

const Template: StoryFn<TMenu> = ({ isLogin, setMenuOpen }) => (
  <MobileMenu isLogin={isLogin} setMenuOpen={setMenuOpen} />
);

export const Default = Template.bind({});
