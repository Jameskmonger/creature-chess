import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "./NavBar";
import { faColumns, faQuestionCircle, faShoppingCart, faUsers } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof NavBar> = {
	title: "@creature-chess / ui / navbar / NavBar",
	component: NavBar,
};
export default meta;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
	args: {
		items: [
			{
				key: "players",
				icon: faUsers,
			},
			{
				key: "shop",
				icon: faShoppingCart,
				children: <span>children</span>,
			},
			{
				key: "stats",
				icon: faColumns,
			},
			{
				key: "settings",
				icon: faQuestionCircle,
			}
		],
		active: "stats",
	},
};
