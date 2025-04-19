import React from "react";

import { Meta, Story } from "@storybook/react";

import { PlayerTitle } from "@creature-chess/models/player/title";

import { LobbyStateProvider } from "../../.storybook/LobbyStateProvider";
import { LobbyPage } from "./lobby";

export default {
	title: "@creature-chess / lobby / LobbyPage",
	component: LobbyPage,
	argTypes: {},
} as Meta;

const Template: Story<any> = (args) => (
	<LobbyStateProvider>
		<LobbyPage {...args} />
	</LobbyStateProvider>
);

export const Default = Template.bind({});
Default.args = {
	maxPlayers: 8,
	players: [
		{
			id: "1234",
			name: "Jeff",
			profile: {
				picture: 20,
				title: null,
			},
		},
		{
			id: "1234",
			name: "William Pickle",
			profile: {
				picture: 37,
				title: {
					color: 0xf7ee85,
					text: "Hall of Fame",
				} as PlayerTitle,
			},
		},
	],
	lobbyWaitTimeSeconds: 60,
	startingAtMs: Date.now() + 60_000,
};
