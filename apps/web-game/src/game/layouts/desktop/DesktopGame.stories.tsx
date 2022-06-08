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

	return (
		<Provider
			store={createMockStore(args.overlay, args.phase, args.halfBoard)}
		>
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
