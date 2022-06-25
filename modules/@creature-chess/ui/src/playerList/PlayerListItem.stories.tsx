import React from "react";

import { Meta, Story } from "@storybook/react";

import {
	finishedBattle,
	inProgressBattle,
	PlayerBattle,
	PlayerListPlayer,
	PlayerStatus,
	PlayerTitle,
	StreakType,
} from "@creature-chess/models";

import { PlayerListItem } from "./playerListItem";

export default {
	title: "Player List/PlayerListItem",
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
} as Meta;

const Template: Story<any> = (args) => (
	<div style={{ maxWidth: "400px" }}>
		<PlayerListItem {...args} />
	</div>
);

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
		picture: 1,
		title: 1,
	},
	battle,
	...others,
});

export const LocalNoBattle = Template.bind({});
LocalNoBattle.args = {
	index: 0,

	isOpponent: false,
	isLocal: true,

	currentlySpectating: false,
	showReadyIndicator: true,

	player: createPlayer(null, {
		name: "Cool Mom227",
		ready: true,
		streakAmount: 0,
		profile: { picture: 4, title: null },
	}),
};

export const OpponentInProgressBattle = Template.bind({});
OpponentInProgressBattle.args = {
	index: 5,

	isOpponent: true,
	isLocal: false,

	opponentName: "[BOT] Lucky",
	currentlySpectating: false,
	showReadyIndicator: true,

	player: createPlayer(inProgressBattle("5678"), {
		money: 4,
		level: 9,
		health: 4,
	}),
};

export const FinishedBattle = Template.bind({});
FinishedBattle.args = {
	index: 0,

	isOpponent: false,
	isLocal: false,

	opponentName: "Jeff",
	currentlySpectating: false,
	showReadyIndicator: true,

	player: createPlayer(finishedBattle("5678", false, 3, 0), {
		name: "[BOT] Bicycle",
		streakType: StreakType.LOSS,
		profile: { picture: 13, title: PlayerTitle.HallOfFame },
	}),
};

export const CurrentlySpectating = Template.bind({});
CurrentlySpectating.args = {
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
		profile: { picture: 20, title: null },
	}),
};
