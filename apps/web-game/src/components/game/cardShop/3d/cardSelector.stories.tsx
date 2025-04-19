import React from "react";

import { Meta, Story } from "@storybook/react";

import { Card as CardModel } from "@creature-chess/models";

import { CardSelector } from "./cardSelector";
import "./cardSelector.stories.css";

export default {
	title: "@creature-chess / game / CardShop / 3d / CardSelector",
	component: CardSelector,
	argTypes: {
		selectedCardIndex: {
			control: {
				type: "number",
			},
		},
	},
} as Meta;

const Template: Story<any> = (args) => (
	<div className="card-selector-story">
		<CardSelector {...args} />
	</div>
);

const cards: CardModel[] = [
	{
		id: "0001",
		definitionId: 10,
		name: "Chenipode",
		traits: ["earth", "cunning"],
		cost: 2,
	},
	{
		id: "0002",
		definitionId: 24,
		name: "Ruption",
		traits: ["fire", "arcane"],
		cost: 3,
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
		definitionId: 46,
		name: "Eaglace",
		traits: ["water", "cunning"],
		cost: 5,
	},
	{
		id: "0005",
		definitionId: 37,
		name: "Arbelder",
		traits: ["wood", "cunning"],
		cost: 5,
	},
];

export const Selector = Template.bind({});
Selector.args = {
	cards,
	selectedCardIndex: 2,
	ownedDefinitionIds: [46, 37],
};
