import React from "react";
import { Meta, Story } from "@storybook/react";

import { LobbyPage } from "./LobbyPage";
import { LobbyContextProvider, LobbyInfo } from "../../context/LobbyContext";
import { PlayerTitle } from "@creature-chess/models";

export default {
	title: "Pages/LobbyPage",
	component: LobbyPage,
	argTypes: {

	}
} as Meta;

const lobbyInfo: LobbyInfo = {
	players: [
		{
			id: "1234",
			name: "Jeff",
			profile: {
				picture: 20,
				title: null
			}
		},
		{
			id: "1234",
			name: "William Pickle",
			profile: {
				picture: 37,
				title: PlayerTitle.HallOfFame
			}
		}
	],
	startingAtMs: Date.now() + 60_000
};

const Template: Story<any> = (args) => (
	<LobbyContextProvider value={lobbyInfo}>
		<LobbyPage />
	</LobbyContextProvider>
);

export const Default = Template.bind({});
Default.args = {
};
