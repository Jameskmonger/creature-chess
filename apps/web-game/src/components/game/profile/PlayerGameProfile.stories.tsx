import React, { ComponentProps } from "react";

import { Meta, Story } from "@storybook/react";

import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { GamemodeSettingsContextProvider } from "../../../contexts/GamemodeSettingsContext";
import { PlayerGameProfile } from "./PlayerGameProfile";

export default {
	title: "@ui / Player / PlayerGameProfile",
	component: PlayerGameProfile,
	argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof PlayerGameProfile>> = (args) => (
	<GamemodeSettingsContextProvider value={GamemodeSettingsPresets["default"]}>
		<PlayerGameProfile />
	</GamemodeSettingsContextProvider>
);
export const Default = Template.bind({});
Default.args = {};
