import React from "react";
import { Provider } from "react-redux";
import { Meta, Story } from "@storybook/react";
import { useGlobalStyles } from "@creature-chess/ui";
import { GamePhase } from "@creature-chess/models";

import { DesktopGame } from "../desktopGame";
import { createMockStore } from "../stories-utils";

export default {
  title: "Game/DesktopGame",
  component: DesktopGame,
  argTypes: {},
} as Meta;

const Template: Story<any> = (args) => {
	useGlobalStyles();

	const store = createMockStore(
		args.halfBoard,
		state => ({
			...state,
			ui: {
				...state.ui,
				winnerId: args.winnerId ? args.winnerId : state.ui.winnerId,
			},
			roundInfo: {
				...state.roundInfo,
				phase: args.phase
			}
		})
	)

	return (
		<Provider store={store}>
			<DesktopGame />
		</Provider>
	);
};

export const Phase_0_Preparing = Template.bind({});
Phase_0_Preparing.args = {
	phase: GamePhase.PREPARING,
	halfBoard: true,
};

export const Phase_1_Ready = Template.bind({});
Phase_1_Ready.args = {
	phase: GamePhase.READY,
	halfBoard: false,
};

export const Phase_2_Playing = Template.bind({});
Phase_2_Playing.args = {
	phase: GamePhase.PLAYING,
	halfBoard: false,
};

export const Phase_3_Victory = Template.bind({});
Phase_3_Victory.args = {
	phase: GamePhase.PLAYING,
	winnerId: "1234",
	halfBoard: false,
};
