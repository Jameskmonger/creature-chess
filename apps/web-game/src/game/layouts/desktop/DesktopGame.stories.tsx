import React from "react";

import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";

import { LocalPlayerContextProvider } from "@creature-chess/auth-web/context";
import { GamePhase } from "@creature-chess/models";
import { useGlobalStyles } from "@creature-chess/ui";

import { createMockStore } from "../stories-utils";
import { DesktopGame } from "./DesktopGame";

export default {
	title: "@game / DesktopGame",
	component: DesktopGame,
	argTypes: {},
} as Meta;

const Template: Story<any> = (args) => {
	useGlobalStyles();

	const store = createMockStore(
		args.phase === GamePhase.PREPARING,
		(state) => ({
			...state,
			ui: {
				...state.ui,
				winnerId: args.winnerId ? args.winnerId : state.ui.winnerId,
			},
			roundInfo: {
				...state.roundInfo,
				phase: args.phase,
			},
			playerInfo: {
				...state.playerInfo,
				opponentId: args.opponentId
					? args.opponentId
					: state.playerInfo.opponentId,
			},
		})
	);

	return (
		<div style={{ width: "90%", height: "90%", border: "2px solid red" }}>
			<LocalPlayerContextProvider
				value={{
					type: "user" as const,
					id: "1234",
					nickname: "jkm",
					stats: {
						wins: 0,
						gamesPlayed: 0,
					},
					registered: true,
				}}
			>
				<Provider store={store}>
					<DesktopGame />
				</Provider>
			</LocalPlayerContextProvider>
		</div>
	);
};

export const Phase_0_Preparing = Template.bind({});
Phase_0_Preparing.args = {
	phase: GamePhase.PREPARING,
};

export const Phase_1_Ready = Template.bind({});
Phase_1_Ready.args = {
	phase: GamePhase.READY,
	opponentId: "5678",
};

export const Phase_2_Playing = Template.bind({});
Phase_2_Playing.args = {
	phase: GamePhase.PLAYING,
};

export const Phase_3_Victory = Template.bind({});
Phase_3_Victory.args = {
	phase: GamePhase.PLAYING,
	winnerId: "1234",
};
