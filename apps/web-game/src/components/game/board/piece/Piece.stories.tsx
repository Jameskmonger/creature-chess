import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Piece } from "./Piece";
import "./Piece.stories.css";
import { PieceContextProvider } from "./PieceContext";

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
		definition: {
			id: args.definitionId || 10,
			name: "",
			traits: args.traits,
			cost: args.creatureCost || 5,
			stages: [],
		},
		facingAway: args.facingAway,
		maxHealth: args.maxHealth || 100,
		currentHealth: args.currentHealth || 50,
		stage: args.stage || 0,
		lastBattleStats: null,
		traits: args.traits || [],
	},
});

const meta: Meta<any> = {
	title: "@creature-chess / game / Board / Piece / Piece",
	component: Piece,
	argTypes: {},
	render: (args) => {
		const { healthbar, piece } = createProps(args);

		return (
			<div className="piece-story-tiles">
				<PieceTile color="light" />
				<PieceTile color="dark">
					<PieceContextProvider value={{ piece, viewingPlayerId: ownerId }}>
						<Piece healthbar={healthbar} />
					</PieceContextProvider>
				</PieceTile>
				<PieceTile color="light" />
				<PieceTile color="dark" />
				<PieceTile color="light" />
				<PieceTile color="dark" />
				<PieceTile color="light" />
				<PieceTile color="dark" />
				<PieceTile color="light">
					<PieceContextProvider value={{ piece, viewingPlayerId: "123" }}>
						<Piece healthbar={healthbar} />
					</PieceContextProvider>
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
		currentHealth: 75,
		maxHealth: 100,
		stage: 1,
		facingAway: false,
		traits: ["earth", "valiant"],
		creatureCost: 3,
	},
};
