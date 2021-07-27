import React from 'react';

import { Card as CardModel, CreatureType, DefinitionClass } from "@creature-chess/models";
import { Card } from '../../src/cardShop';

import "./card.stories.css";

export default {
	title: 'Module - Card Shop/Card',
	component: Card
};

const Template = (args) => <div className="card-story"><Card {...args} /></div>;

const card: CardModel = {
	id: '1234',
	definitionId: 10,
	name: "Chenipode",
	type: CreatureType.Earth,
	class: DefinitionClass.CUNNING,
	cost: 2
};

export const Chenipode = Template.bind({});
Chenipode.args = {
	card
};
