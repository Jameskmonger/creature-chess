import React from "react";

import { Meta, Story } from "@storybook/react";

import { LobbyPlayer, PlayerTitle } from "@creature-chess/models";

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
	player: createLobbyPlayer(PlayerTitle.Developer, false),
};

export const BotPlayer = Template.bind({});
BotPlayer.args = {
	player: createLobbyPlayer(null, true),
};
