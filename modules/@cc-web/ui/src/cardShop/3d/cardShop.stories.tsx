import React from "react";

import { Meta, Story } from "@storybook/react";

import { Card as CardModel } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { GamemodeSettingsContextProvider } from "../../../GamemodeSettingsContext";
import { CardShop } from "./cardShop";
import "./cardShop.stories.css";

export default {
	title: "@cc-web / ui / Card Shop / 3d / CardShop",
	component: CardShop,
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
} as Meta;

const Template: Story<any> = (args) => (
	<GamemodeSettingsContextProvider value={GamemodeSettingsPresets["default"]}>
		<div className="card-shop-story">
			<CardShop {...args} />
		</div>
	</GamemodeSettingsContextProvider>
);

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

export const Shop = Template.bind({});
Shop.args = {
	cards,
	isLocked: false,
	money: 14,
	ownedDefinitionIds: [32],
};

export const SomeMissing = Template.bind({});
SomeMissing.args = {
	cards: [...cards.map((card, index) => (index === 3 ? null : card))],
	isLocked: false,
	money: 14,
	ownedDefinitionIds: [32],
};
