import React from "react";

import { Meta, Story } from "@storybook/react";

import { MenuStateProvider } from "../../.storybook/MenuStateProvider";
import { MenuPage } from "./menu";

export default {
	title: "@creature-chess / menu / MenuPage",
	component: MenuPage,
} as Meta;

const Template: Story = () => (
	<MenuStateProvider>
		<MenuPage />
	</MenuStateProvider>
);

export const Default = Template.bind({});
Default.args = {};
