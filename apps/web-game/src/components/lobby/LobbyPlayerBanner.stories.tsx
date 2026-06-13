import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { LobbyPlayer } from "@creature-chess/models";
import { PlayerTitle } from "@creature-chess/models";

import { LobbyPlayerBanner } from "./LobbyPlayerBanner";

const meta: Meta<typeof LobbyPlayerBanner> = {
	title: "@creature-chess / lobby / LobbyPlayerBanner",
	component: LobbyPlayerBanner,
	argTypes: {},
	render: (args) => (
		<div style={{ width: "320px", height: "80px" }}>
			<LobbyPlayerBanner {...args} />
		</div>
	),
};
export default meta;

type Story = StoryObj<typeof LobbyPlayerBanner>;

const createLobbyPlayer = (
	title: PlayerTitle | null,
	isBot: boolean
): LobbyPlayer | null => {
	if (isBot) {
		return null;
	}

	return {
		id: "12300234",
		name: "BigManEdam",
		type: "player",
		profile: {
			title,
			picture: "creature:5",
		},
	};
};

export const StandardPlayer: Story = {
	args: {
		player: createLobbyPlayer(null, false),
	},
};

export const Developer: Story = {
	args: {
		player: createLobbyPlayer({ color: 0x79ffe0, text: "Developer" }, false),
	},
};

export const Contributor: Story = {
	args: {
		player: createLobbyPlayer({ color: 0xe89292, text: "Contributor" }, false),
	},
};

export const HallOfFame: Story = {
	args: {
		player: createLobbyPlayer({ color: 0xf7ee85, text: "Hall of Fame" }, false),
	},
};

export const BotPlayer: Story = {
	args: {
		player: createLobbyPlayer(null, true),
	},
};
