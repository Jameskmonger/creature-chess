import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { GameSession } from "~/game/GameSession";
import { GameSessionHolder } from "~/game/GameSessionHolder";
import { GameSessionProvider } from "~/game/sessionContext";

import { Card as CardModel } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models";

import { CardShopPresentation } from "./cardShop";
import "./cardShop.stories.css";

function createDefaultHolder(): GameSessionHolder {
	const holder = new GameSessionHolder();
	holder.set(new GameSession(GamemodeSettingsPresets.default));
	return holder;
}

const meta: Meta<any> = {
	title: "@creature-chess / game / CardShop",
	component: CardShopPresentation,
	argTypes: {
		money: {
			control: {
				type: "number",
			},
		},
		isLocked: {
			control: {
				type: "boolean",
			},
		},
	},
	render: (args) => (
		<GameSessionProvider holder={createDefaultHolder()}>
			<div className="card-shop-story">
				<CardShopPresentation {...args} />
			</div>
		</GameSessionProvider>
	),
};
export default meta;

type Story = StoryObj<any>;

const cards: CardModel[] = [
	{
		id: "0005",
		definitionId: 37,
		name: "Arbelder",
		traits: ["wood", "valiant"],
		cost: 5,
	},
	{
		id: "0001",
		definitionId: 10,
		name: "Chenipode",
		traits: ["earth", "cunning"],
		cost: 2,
	},
	{
		id: "0002",
		definitionId: 4,
		name: "Aardorn",
		traits: ["earth", "cunning"],
		cost: 1,
	},
	{
		id: "0003",
		definitionId: 32,
		name: "Cairfrey",
		traits: ["metal", "arcane"],
		cost: 3,
	},
	{
		id: "0004",
		definitionId: 30,
		name: "Hubursa",
		traits: ["earth", "arcane"],
		cost: 4,
	},
];

export const Shop: Story = {
	args: {
		cards,
		isLocked: false,
		money: 14,
		ownedDefinitionIds: [32],
	},
};

export const SomeMissing: Story = {
	args: {
		cards: [...cards.map((card, index) => (index === 3 ? null : card))],
		isLocked: false,
		money: 14,
		ownedDefinitionIds: [32],
	},
};
