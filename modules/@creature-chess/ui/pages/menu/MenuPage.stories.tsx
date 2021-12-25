import React from "react";
import { Meta, Story } from "@storybook/react";

import { MenuPage } from "./MenuPage";
import { MenuContextProvider } from "../../context/MenuContext";

export default {
	title: "Pages/MenuPage",
	component: MenuPage,
	argTypes: {
		logout: { action: "logoutClicked" },
		findGame: { action: "findGameClicked" }
	}
} as Meta;

const Template: Story<{ logout: () => void; findGame: () => void }> = ({ logout, findGame }) => (
	<MenuContextProvider value={{ auth: { logout }, findGame }}>
		<MenuPage />
	</MenuContextProvider>
);

export const Default = Template.bind({});
Default.args = {
};
