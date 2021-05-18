import React from 'react';

import { PlayerListPlayer, PlayerStatus, StreakType } from "@creature-chess/models";
import { PlayerAvatar } from "../../src/player";

export default {
	title: 'Player/Avatar',
	component: PlayerAvatar,
	argTypes: {
	}
};

const Template = (args) => <PlayerAvatar {...args} />;

const createPlayer = (picture: number): PlayerListPlayer => ({
	id: '1234',
	name: 'jkm',
	health: 100,
	ready: false,
	status: PlayerStatus.CONNECTED,
	streakType: StreakType.WIN,
	streakAmount: 0,
	money: 3,
	level: 1,
	profile: {
		picture,
		title: null
	},
	battle: null
})

export const Budaye = Template.bind({});
Budaye.args = {
	player: createPlayer(1)
};

export const Aardorn = Template.bind({});
Aardorn.args = {
	player: createPlayer(4)
};

export const Nut = Template.bind({});
Nut.args = {
	player: createPlayer(5)
};

export const Embra = Template.bind({});
Embra.args = {
	player: createPlayer(7)
};

export const Tweesher = Template.bind({});
Tweesher.args = {
	player: createPlayer(8)
};
