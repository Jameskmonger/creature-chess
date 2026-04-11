import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { LocalPlayerContextProvider } from "~/auth/context";
import { GamemodeSettingsContextProvider } from "~/contexts/GamemodeSettingsContext";

import { GamemodeSettingsPresets } from "@creature-chess/models";

import { createMockStore } from "../../../../.storybook/utils";
import { PlayerGameProfile } from "./PlayerGameProfile";

const meta: Meta<typeof PlayerGameProfile> = {
	title: "@creature-chess / game / Profile / PlayerGameProfile",
	component: PlayerGameProfile,
	argTypes: {},
	render: () => {
		const store = createMockStore();

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
	},
};
export default meta;

type Story = StoryObj<typeof PlayerGameProfile>;

export const Default: Story = {};
