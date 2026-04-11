import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { MenuStateProvider } from "../../.storybook/MenuStateProvider";
import { MenuPage } from "./menu";

const meta: Meta<typeof MenuPage> = {
	title: "@creature-chess / menu / MenuPage",
	component: MenuPage,
	render: () => (
		<MenuStateProvider>
			<MenuPage />
		</MenuStateProvider>
	),
};
export default meta;

type Story = StoryObj<typeof MenuPage>;

export const Default: Story = {};
