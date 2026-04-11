import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { finishedBattle } from "@creature-chess/models";

import { StatusPlayerListItem } from "./statusPlayerListItem";

const meta: Meta<typeof StatusPlayerListItem> = {
	title: "@creature-chess / game / Player List / StatusPlayerListItem",
	component: StatusPlayerListItem,
	render: (args) => (
		<div style={{ width: "400px" }}>
			<StatusPlayerListItem {...args} />
		</div>
	),
};
export default meta;

type Story = StoryObj<typeof StatusPlayerListItem>;

export const DeadPlayer: Story = {
	args: {
		name: "JKM",
		opponentName: "Jeff",
		battle: finishedBattle("1234", false, true, 0, 3),
		status: "Dead",
		subtitle: "8th place",
	},
};
