import React from "react";

import { Meta, Story } from "@storybook/react";

import { CreatureImage } from "./creatureImage";

export default {
	title: "Display/CreatureImage",
	component: CreatureImage,
	argTypes: {
		definitionId: { type: "number", required: true },
		facing: {
			control: {
				type: "radio",
				options: ["front", "back"],
			},
		},
	},
} as Meta;

const Template: Story<any> = (args) => <CreatureImage {...args} />;

export const Kirkanon = Template.bind({});
Kirkanon.args = {
	definitionId: 47,
	facing: "front",
};

export const CardilingFacingAway = Template.bind({});
CardilingFacingAway.args = {
	definitionId: 13,
	facing: "back",
};
