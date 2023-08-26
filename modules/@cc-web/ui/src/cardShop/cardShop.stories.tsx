import React from "react";

import { Meta, Story } from "@storybook/react";

import {
	Card as CardModel,
	CreatureType,
	DefinitionClass,
} from "@creature-chess/models";

import { CardShop } from "./cardShop";
import "./cardShop.stories.css";

export default {
	title: "@ui / Card Shop / CardShop",
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
	<div className="card-shop-story">
		<CardShop {...args} />
	</div>
);

const cards: CardModel[] = [
	{
		id: "0005",
		definitionId: 37,
		name: "Arbelder",
		type: CreatureType.Wood,
		class: DefinitionClass.VALIANT,
		cost: 5,
	},
	{
		id: "0001",
		definitionId: 10,
		name: "Chenipode",
		type: CreatureType.Earth,
		class: DefinitionClass.CUNNING,
		cost: 2,
	},
	{
		id: "0002",
		definitionId: 24,
		name: "Ruption",
		type: CreatureType.Fire,
		class: DefinitionClass.ARCANE,
		cost: 3,
	},
	{
		id: "0003",
		definitionId: 32,
		name: "Cairfrey",
		type: CreatureType.Metal,
		class: DefinitionClass.ARCANE,
		cost: 3,
	},
	{
		id: "0004",
		definitionId: 46,
		name: "Eaglace",
		type: CreatureType.Water,
		class: DefinitionClass.CUNNING,
		cost: 5,
	},
];

export const Shop = Template.bind({});
Shop.args = {
	cards,
	isLocked: false,
	money: 14,
};
