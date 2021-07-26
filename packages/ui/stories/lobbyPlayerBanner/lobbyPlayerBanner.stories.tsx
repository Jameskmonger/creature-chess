import React from "react";
import { LobbyPlayer, PlayerTitle } from "@creature-chess/models";
import { LobbyPlayerBanner } from "../../src/lobbyPlayerBanner/lobbyPlayerBanner";

import "./lobbyPlayerBanner.stories.css";

export default {
	title: "Lobby/LobbyPlayerBanner",
	component: LobbyPlayerBanner,
	argTypes: {
	}
};

const Template = (args) => <LobbyPlayerBanner {...args} />;

const createLobbyPlayer = (title: PlayerTitle, isBot: boolean): LobbyPlayer | null => {
	if (isBot) {
		return null;
	}
	return ({
		id: "12300234",
		name: "BigManEdam",
		profile: {
			title: title,
			picture: 5
		}
	})
}

export const StandardPlayer = Template.bind({});
StandardPlayer.args = {
	player: createLobbyPlayer(null, false)
}
export const Developer = Template.bind({});
Developer.args = {
	player: createLobbyPlayer(PlayerTitle.Developer, false)
}
export const BotPlayer = Template.bind({});
BotPlayer.args = {
	player: createLobbyPlayer(null, true)
}
