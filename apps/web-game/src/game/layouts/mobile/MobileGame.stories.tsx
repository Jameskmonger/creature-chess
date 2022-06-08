import React from "react";
import { Provider } from "react-redux";
import { Meta, Story } from "@storybook/react";
import { useGlobalStyles } from "@creature-chess/ui";
import { GamePhase } from "@creature-chess/models";

import { MobileGame } from "./MobileGame";
import { Overlay } from "../../ui";
import { createMockStore } from "./stories-utils";

export default {
  title: "Game/MobileGame",
  component: MobileGame,
  argTypes: {},
} as Meta;

const Template: Story<any> = (args) => {
	useGlobalStyles();

	return (
		<Provider
			store={createMockStore(args.overlay, args.phase)}
		>
			<MobileGame />
		</Provider>
	);
};

export const Phase_0_Preparing = Template.bind({});
Phase_0_Preparing.args = {
	overlay: null
};

export const Phase_1_Ready = Template.bind({});
Phase_1_Ready.args = {
	overlay: null,
	phase: GamePhase.READY
};

export const Tab_1_Players_Overlay = Template.bind({});
Tab_1_Players_Overlay.args = {
	overlay: Overlay.PLAYERS
};

export const Tab_2_Shop_Overlay = Template.bind({});
Tab_2_Shop_Overlay.args = {
	overlay: Overlay.SHOP
};

export const Tab_3_Help_Overlay = Template.bind({});
Tab_3_Help_Overlay.args = {
	overlay: Overlay.HELP
};

export const Tab_4_Settings_Overlay = Template.bind({});
Tab_4_Settings_Overlay.args = {
	overlay: Overlay.SETTINGS
};
