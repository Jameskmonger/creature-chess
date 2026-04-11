import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { CreatureImage } from "./creatureImage";

const meta: Meta<typeof CreatureImage> = {
	title: "@creature-chess / ui / CreatureImage",
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
};
export default meta;

type Story = StoryObj<typeof CreatureImage>;

export const Kirkanon: Story = {
	args: {
		definitionId: 47,
		facing: "front",
	},
};

export const CardilingFacingAway: Story = {
	args: {
		definitionId: 13,
		facing: "back",
	},
};
