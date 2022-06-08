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

export const Ready_Phase = Template.bind({});
Ready_Phase.args = {
	overlay: null,
	phase: GamePhase.READY
};

export const No_Overlay = Template.bind({});
No_Overlay.args = {
	overlay: null
};

export const Help_Overlay = Template.bind({});
Help_Overlay.args = {
	overlay: Overlay.HELP
};

export const Players_Overlay = Template.bind({});
Players_Overlay.args = {
	overlay: Overlay.PLAYERS
};

export const Shop_Overlay = Template.bind({});
Shop_Overlay.args = {
	overlay: Overlay.SHOP
};

export const Settings_Overlay = Template.bind({});
Settings_Overlay.args = {
	overlay: Overlay.SETTINGS
};
