import React, { ComponentProps } from "react";

import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";

import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { LocalPlayerContextProvider } from "../../../auth/context";
import { GamemodeSettingsContextProvider } from "../../../contexts/GamemodeSettingsContext";
import { createMockStore } from "../../../utils/stories-utils";
import { PlayerGameProfile } from "./PlayerGameProfile";

export default {
	title: "@ui / Player / PlayerGameProfile",
	component: PlayerGameProfile,
	argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof PlayerGameProfile>> = (args) => {
	const store = createMockStore(false);

	return (
		<Provider store={store}>
			<LocalPlayerContextProvider
				value={{ type: "guest", id: "1234", nickname: "Guest" }}
			>
				<GamemodeSettingsContextProvider
					value={GamemodeSettingsPresets["default"]}
				>
					<PlayerGameProfile />
				</GamemodeSettingsContextProvider>
			</LocalPlayerContextProvider>
		</Provider>
	);
};
export const Default = Template.bind({});
Default.args = {};
