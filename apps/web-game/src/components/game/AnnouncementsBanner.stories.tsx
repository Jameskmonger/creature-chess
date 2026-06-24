import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { CreatureDefinition } from "@creature-chess/models";

import { setCreatureDefinitions } from "~/networking/creatureDefinitions";

import { GameStateProvider } from "../../../.storybook/GameStateProvider";
import { AnnouncementsBanner } from "./AnnouncementsBanner";

const mockDefinition = (id: number, name: string): CreatureDefinition => ({
	id,
	name,
	cost: 1,
	traits: [],
	attackRange: 1,
	stages: [],
});

setCreatureDefinitions([
	{ definition: mockDefinition(47, "Kirkanon"), ownerPluginId: "mock" },
	{ definition: mockDefinition(32, "Cairfrey"), ownerPluginId: "mock" },
]);

const meta: Meta<typeof AnnouncementsBanner> = {
	title: "@creature-chess / game / AnnouncementsBanner",
	component: AnnouncementsBanner,
	render: () => (
		<GameStateProvider>
			<AnnouncementsBanner />
		</GameStateProvider>
	),
};

export default meta;

type Story = StoryObj<typeof AnnouncementsBanner>;

export const Default: Story = {};

export const Single: Story = {
	render: () => (
		<GameStateProvider
			decorateState={(state) => ({
				...state,
				announcements: {
					items: [
						{
							id: 0,
							kind: "upgrade",
							playerId: "1234",
							definitionId: 47,
							stage: 2,
						},
					],
					nextId: 1,
				},
			})}
		>
			<AnnouncementsBanner />
		</GameStateProvider>
	),
};
