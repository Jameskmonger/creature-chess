import React from "react";
import { Meta, Story } from "@storybook/react";

import { MenuPage } from "./MenuPage";
import { MenuPageContextProvider } from "./MenuPageContext";

export default {
	title: "Pages/MenuPage",
	component: MenuPage,
	argTypes: {
		logout: { action: "logoutClicked" },
		findGame: { action: "findGameClicked" }
	}
} as Meta;

const Template: Story<{ logout: () => void; findGame: () => void }> = ({ logout, findGame }) => (
	<MenuPageContextProvider value={{ auth: { logout }, findGame }}>
		<MenuPage />
	</MenuPageContextProvider>
);

export const Default = Template.bind({});
Default.args = {
};
