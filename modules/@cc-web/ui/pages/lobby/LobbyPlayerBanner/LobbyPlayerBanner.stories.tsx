import React from "react";

import { Meta, Story } from "@storybook/react";

import { LobbyPlayer } from "@creature-chess/models/lobby";
import { PlayerTitle } from "@creature-chess/models/player/title";

import { LobbyPlayerBanner } from "./LobbyPlayerBanner";

export default {
	title: "@ui / Pages / LobbyPage / LobbyPlayerBanner",
	component: LobbyPlayerBanner,
	argTypes: {},
} as Meta;

const Template: Story<any> = (args) => (
	<div style={{ width: "320px", height: "80px" }}>
		<LobbyPlayerBanner {...args} />
	</div>
);

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
		profile: {
			title,
			picture: 5,
		},
	};
};

export const StandardPlayer = Template.bind({});
StandardPlayer.args = {
	player: createLobbyPlayer(null, false),
};

export const Developer = Template.bind({});
Developer.args = {
	player: createLobbyPlayer({ color: 0x79ffe0, text: "Developer" }, false),
};

export const Contributor = Template.bind({});
Contributor.args = {
	player: createLobbyPlayer({ color: 0xe89292, text: "Contributor" }, false),
};

export const HallOfFame = Template.bind({});
HallOfFame.args = {
	player: createLobbyPlayer({ color: 0xf7ee85, text: "HallOfFame" }, false),
};

export const BotPlayer = Template.bind({});
BotPlayer.args = {
	player: createLobbyPlayer(null, true),
};
