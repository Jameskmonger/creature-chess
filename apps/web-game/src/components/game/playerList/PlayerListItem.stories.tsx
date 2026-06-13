import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import {
	PlayerStatus,
	PlayerBattle,
	PlayerListPlayer,
	inProgressBattle,
	finishedBattle,
} from "@creature-chess/models";
import { StreakType } from "@creature-chess/models";

import { PlayerListItem } from "./playerListItem";

const meta: Meta<typeof PlayerListItem> = {
	title: "@creature-chess / game / Player List / PlayerListItem",
	component: PlayerListItem,
	argTypes: {
		currentlySpectating: {
			control: {
				type: "boolean",
			},
		},
		showReadyIndicator: {
			control: {
				type: "boolean",
			},
		},
	},
	render: (args) => (
		<div style={{ maxWidth: "400px" }}>
			<PlayerListItem {...args} />
		</div>
	),
};
export default meta;

type Story = StoryObj<typeof PlayerListItem>;

const createPlayer = (
	battle: PlayerBattle,
	others: Partial<PlayerListPlayer> = {}
): PlayerListPlayer => ({
	id: "1234",
	name: "jkm",
	health: 69,
	ready: false,
	status: PlayerStatus.CONNECTED,
	streakType: StreakType.WIN,
	streakAmount: 3,
	money: 20,
	level: 4,
	profile: {
		picture: "creature:1",
		title: {
			color: 0xe89292,
			text: "Contributor",
		},
	},
	battle,
	...others,
});

export const LocalNoBattle: Story = {
	args: {
		index: 0,

		isOpponent: false,
		isLocal: true,

		currentlySpectating: false,
		showReadyIndicator: true,

		player: createPlayer(null, {
			name: "Cool Mom227",
			ready: true,
			streakAmount: 0,
			profile: { picture: "creature:4", title: null },
		}),
	},
};

export const OpponentInProgressBattle: Story = {
	args: {
		index: 5,

		isOpponent: true,
		isLocal: false,

		opponentName: "[BOT] Lucky",
		currentlySpectating: false,
		showReadyIndicator: true,

		player: createPlayer(inProgressBattle("5678", false), {
			money: 4,
			level: 9,
			health: 4,
		}),
	},
};

export const OpponentInProgressBattleVsClone: Story = {
	args: {
		index: 5,

		isOpponent: true,
		isLocal: false,

		opponentName: "[BOT] Lucky",
		currentlySpectating: false,
		showReadyIndicator: true,

		player: createPlayer(inProgressBattle("5678", true), {
			money: 4,
			level: 9,
			health: 4,
		}),
	},
};

export const FinishedBattle: Story = {
	args: {
		index: 0,

		isOpponent: false,
		isLocal: false,

		opponentName: "Jeff",
		currentlySpectating: false,
		showReadyIndicator: true,

		player: createPlayer(finishedBattle("5678", false, false, 3, 0), {
			name: "[BOT] Bicycle",
			streakType: StreakType.LOSS,
			profile: {
				picture: "creature:13",
				title: {
					color: 0xf7ee85,
					text: "Hall of Fame",
				},
			},
		}),
	},
};

export const FinishedBattleVsClone: Story = {
	args: {
		index: 0,

		isOpponent: false,
		isLocal: false,

		opponentName: "Jeff",
		currentlySpectating: false,
		showReadyIndicator: true,

		player: createPlayer(finishedBattle("5678", true, false, 3, 0), {
			name: "[BOT] Bicycle",
			streakType: StreakType.LOSS,
			profile: {
				picture: "creature:13",
				title: {
					color: 0xf7ee85,
					text: "Hall of Fame",
				},
			},
		}),
	},
};

export const CurrentlySpectating: Story = {
	args: {
		index: 0,

		isOpponent: false,
		isLocal: false,

		opponentName: "[BOT] Lucky",
		currentlySpectating: true,
		showReadyIndicator: true,

		player: createPlayer(null, {
			name: "Purepker895",
			ready: true,
			streakAmount: 0,
			profile: { picture: "creature:20", title: null },
		}),
	},
};
