import React from "react";
import { Meta, Story } from "@storybook/react";

import { CreatureType, DefinitionClass } from "@creature-chess/models";
import { Piece } from "./Piece";

import "./Piece.stories.css";

export default {
	title: "Piece",
	component: Piece,
	argTypes: {

	}
} as Meta;

const PieceTile = ({ color, children }: { color: "dark" | "light"; children?: React.ReactNode }) => (
	<div className={`piece-story ${color}`}>
		{children}
	</div>
);

const Template: Story<any> = (args) => (
	<div className="piece-story-tiles">
		<PieceTile color="light" />
		<PieceTile color="dark"><Piece {...createProps(args)} /></PieceTile>
		<PieceTile color="light" />
		<PieceTile color="dark" />
		<PieceTile color="light" />
		<PieceTile color="dark" />
		<PieceTile color="light" />
		<PieceTile color="dark" />
		<PieceTile color="light"><Piece {...createProps(args)} /></PieceTile>
		<PieceTile color="dark" />
	</div>
);

const createProps = (args: any): any => ({
	healthbar: args.healthbar,
	piece: {
		id: "123",
		ownerId: "123",
		definitionId: args.definitionId || 10,
		definition: {
			id: args.definitionId || 10,
			name: "",
			class: args.creatureClass || DefinitionClass.VALIANT,
			type: args.creatureType || CreatureType.Fire,
			cost: args.creatureCost || 5,
			stages: []
		},
		facingAway: args.facingAway,
		maxHealth: args.maxHealth || 100,
		currentHealth: args.currentHealth || 50,
		stage: args.stage || 0
	}
});

export const Friendly = Template.bind({});
Friendly.args = {
	healthbar: "friendly",
	definitionId: 20,
	currentHealth: 75,
	maxHealth: 100,
	stage: 1,
	facingAway: false,
	creatureClass: DefinitionClass.VALIANT,
	creatureType: CreatureType.Earth,
	creatureCost: 3
};
