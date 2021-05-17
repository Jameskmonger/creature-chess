import React from 'react';

import { CreatureImage } from '../src/creatureImage';

export default {
	title: 'Creature/Image',
	component: CreatureImage,
	argTypes: {
		definitionId: { type: 'number', required: true },
		facing: {
			control: {
				type: 'radio',
				options: ['front', 'back']
			}
		},
		baseUrl: {
			control: {
				type: null
			}
		}
	},
};

const Template = (args) => <CreatureImage {...args} />;

export const Kirkanon = Template.bind({});
Kirkanon.args = {
	definitionId: 47,
	facing: "front",
	baseUrl: "https://creaturechess.jamesmonger.com/"
};

export const CardilingFacingAway = Template.bind({});
CardilingFacingAway.args = {
	definitionId: 13,
	facing: "back",
	baseUrl: "https://creaturechess.jamesmonger.com/"
};
