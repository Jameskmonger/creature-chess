import React from 'react';

import { finishedBattle, inProgressBattle, PlayerBattle, PlayerListPlayer, PlayerStatus, PlayerTitle, StreakType } from "@creature-chess/models";
import { PlayerListItem } from '../src/playerListItem/playerListItem';

export default {
	title: 'Player/PlayerListItem',
	component: PlayerListItem,
	argTypes: {
		currentlySpectating: {
			control: {
				type: 'boolean'
			}
		},
		showReadyIndicator: {
			control: {
				type: 'boolean'
			}
		}
	}
};

const Template = (args) => <div style={{ maxWidth: "400px" }}><PlayerListItem {...args} /></div>;


const createPlayer = (battle: PlayerBattle, others?: Partial<PlayerListPlayer> = {}): PlayerListPlayer => ({
	id: '1234',
	name: 'jkm',
	health: 69,
	ready: false,
	status: PlayerStatus.CONNECTED,
	streakType: StreakType.WIN,
	streakAmount: 3,
	money: 20,
	level: 4,
	profile: {
		picture: 1,
		title: 1
	},
	battle,
	...others
})

export const NoBattle = Template.bind({});
NoBattle.args = {
	index: 0,

	isOpponent: true,
	isLocal: false,

	opponentName: "Jeff",
	currentlySpectating: false,
	showReadyIndicator: true,

	player: createPlayer(null, { ready: true, streakAmount: 0 })
};

export const InProgressBattle = Template.bind({});
InProgressBattle.args = {
	index: 5,

	isOpponent: true,
	isLocal: false,

	opponentName: "Jeff",
	currentlySpectating: false,
	showReadyIndicator: true,

	player: createPlayer(inProgressBattle('5678'), { money: 4, level: 9, health: 4 })
};

export const FinishedBattle = Template.bind({});
FinishedBattle.args = {
	index: 0,

	isOpponent: true,
	isLocal: false,

	opponentName: "Jeff",
	currentlySpectating: false,
	showReadyIndicator: true,

	player: createPlayer(finishedBattle('5678', false, 3, 0))
};
