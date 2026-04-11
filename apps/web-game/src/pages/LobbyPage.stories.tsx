import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { PlayerTitle } from "@creature-chess/models";

import { LobbyStateProvider } from "../../.storybook/LobbyStateProvider";
import { LobbyPage } from "./lobby";

const meta: Meta<any> = {
	title: "@creature-chess / lobby / LobbyPage",
	component: LobbyPage,
	argTypes: {},
	render: (args) => (
		<LobbyStateProvider players={args.players}>
			<LobbyPage />
		</LobbyStateProvider>
	),
};
export default meta;

type Story = StoryObj<any>;

export const Default: Story = {
	args: {
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
	},
};
