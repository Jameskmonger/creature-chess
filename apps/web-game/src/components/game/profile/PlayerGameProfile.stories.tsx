import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { LocalPlayerContextProvider } from "~/auth/context";
import { GameSession } from "~/game/GameSession";
import { GameSessionHolder } from "~/game/GameSessionHolder";
import { GameSessionProvider } from "~/game/sessionContext";

import { GamemodeSettingsPresets } from "@creature-chess/models";

import { createMockStore } from "../../../../.storybook/utils";
import { PlayerGameProfile } from "./PlayerGameProfile";

function createDefaultHolder(): GameSessionHolder {
	const holder = new GameSessionHolder();
	holder.set(new GameSession(GamemodeSettingsPresets.default));
	return holder;
}

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
					<GameSessionProvider holder={createDefaultHolder()}>
						<PlayerGameProfile />
					</GameSessionProvider>
				</LocalPlayerContextProvider>
			</Provider>
		);
	},
};
export default meta;

type Story = StoryObj<typeof PlayerGameProfile>;

export const Default: Story = {};
