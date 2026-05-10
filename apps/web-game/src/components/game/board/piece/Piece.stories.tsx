import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Piece } from "./Piece";
import "./Piece.stories.css";

function PieceTile({
	color,
	children,
}: {
	color: "dark" | "light";
	children?: React.ReactNode;
}) {
	return <div className={`piece-story ${color}`}>{children}</div>;
}

const ownerId = "123";

const createProps = (args: any) => ({
	healthbar: args.healthbar,
	piece: {
		id: "123",
		ownerId,
		definitionId: args.definitionId || 10,
		maxHealth: args.maxHealth || 100,
		stage: args.stage || 0,
		traits: args.traits || [],
	},
});

const meta: Meta<any> = {
	title: "@creature-chess / game / Board / Piece / Piece",
	component: Piece,
	argTypes: {},
	render: (args) => {
		const { healthbar, piece } = createProps(args);

		const healthbarProp =
			healthbar && healthbar !== "none"
				? { color: healthbar, current: piece.maxHealth }
				: undefined;

		return (
			<div className="piece-story-tiles">
				<PieceTile color="light" />
				<PieceTile color="dark">
					<Piece piece={piece} healthbar={healthbarProp} />
				</PieceTile>
				<PieceTile color="light" />
				<PieceTile color="dark" />
				<PieceTile color="light" />
				<PieceTile color="dark" />
				<PieceTile color="light" />
				<PieceTile color="dark" />
				<PieceTile color="light">
					<Piece piece={piece} healthbar={healthbarProp} />
				</PieceTile>
				<PieceTile color="dark" />
			</div>
		);
	},
};
export default meta;

type Story = StoryObj<any>;

export const Friendly: Story = {
	args: {
		healthbar: "friendly",
		definitionId: 20,
		maxHealth: 100,
		stage: 1,
		traits: ["earth", "valiant"],
		creatureCost: 3,
	},
};
