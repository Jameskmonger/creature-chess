import React from "react";

import { Card as CardModel, CreatureType, DefinitionClass } from "@creature-chess/models";
import { CardSelector } from "./cardSelector";

import "./cardSelector.stories.css";

export default {
	title: "Card Shop/CardSelector",
	component: CardSelector,
	argTypes: {
		selectedCardIndex: {
			control: {
				type: "number"
			}
		}
	}
};

const Template = (args) => <div className="card-selector-story"><CardSelector {...args} /></div>;

const cards: CardModel[] = [{
	id: "0001",
	definitionId: 10,
	name: "Chenipode",
	type: CreatureType.Earth,
	class: DefinitionClass.CUNNING,
	cost: 2
}, {
	id: "0002",
	definitionId: 24,
	name: "Ruption",
	type: CreatureType.Fire,
	class: DefinitionClass.ARCANE,
	cost: 3
}, {
	id: "0003",
	definitionId: 32,
	name: "Cairfrey",
	type: CreatureType.Metal,
	class: DefinitionClass.ARCANE,
	cost: 3
}, {
	id: "0004",
	definitionId: 46,
	name: "Eaglace",
	type: CreatureType.Water,
	class: DefinitionClass.CUNNING,
	cost: 5
}, {
	id: "0005",
	definitionId: 37,
	name: "Arbelder",
	type: CreatureType.Wood,
	class: DefinitionClass.VALIANT,
	cost: 5
}];

export const Selector = Template.bind({});
Selector.args = {
	cards,
	selectedCardIndex: 2
};
