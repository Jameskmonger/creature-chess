import React, { ComponentProps } from "react";

import { Meta, Story } from "@storybook/react";

import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { GamemodeSettingsContextProvider } from "../GamemodeSettingsContext";
import { PlayerGameProfile } from "./PlayerGameProfile";

export default {
	title: "@ui / Player / PlayerGameProfile",
	component: PlayerGameProfile,
	argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof PlayerGameProfile>> = (args) => (
	<GamemodeSettingsContextProvider value={GamemodeSettingsPresets["default"]}>
		<PlayerGameProfile {...args} />
	</GamemodeSettingsContextProvider>
);
export const Default = Template.bind({});
Default.args = {
	name: "Jeff",
	position: 2,
	health: 73,
	level: 4,
	xp: 2,
	money: 15,
	pieceCount: 3,
} as ComponentProps<typeof PlayerGameProfile>;
