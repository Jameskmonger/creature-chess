import React from "react";

import { Meta, Story } from "@storybook/react";

import { LobbyPage } from "./LobbyPage";
import { LobbyPageContext, LobbyPageContextProvider } from "./LobbyPageContext";

export default {
	title: "@ui / Pages / LobbyPage",
	component: LobbyPage,
	argTypes: {},
} as Meta;

const lobbyInfo: React.ContextType<typeof LobbyPageContext> = {
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
				},
			},
		},
	],
	lobbyWaitTimeSeconds: 60,
	startingAtMs: Date.now() + 60_000,
};

const Template: Story<any> = (args) => (
	<LobbyPageContextProvider value={lobbyInfo}>
		<LobbyPage />
	</LobbyPageContextProvider>
);

export const Default = Template.bind({});
Default.args = {};
