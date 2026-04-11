import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { SubscribableBoard } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

import { MatchPiece, PieceContextProvider } from "../game/board/piece";
import { GameBoard } from "./GameBoard";

const meta: Meta<typeof GameBoard> = {
	title: "@creature-chess / components / board / GameBoard",
	component: GameBoard,
};
export default meta;

type Story = StoryObj<typeof GameBoard>;

const board = new SubscribableBoard(7, 6);

board.setPieces([
	{ id: "piece-1", x: 0, y: 0 },
	{ id: "piece-2", x: 6, y: 5 },
]);

setInterval(() => {
	const newX = Math.floor(Math.random() * 5);
	const newY = Math.floor(Math.random() * 6);

	board.setPiece("piece-1", newX, newY);
}, 1000);

export const Default: Story = {
	render: (args) => (
		<>
			<style>
				{`
				.odd-tile {
					background: #38b764;
				}

				.even-tile {
					background: #a7f070;
				}

				.board {
					border: 5px solid black;
				}
				`}
			</style>

			<GameBoard {...args} />
		</>
	),
	args: {
		board,
		renderPiece: (piece: PieceModel): React.ReactNode => (
			<PieceContextProvider value={{ piece, viewingPlayerId: "player-1" }}>
				<MatchPiece />
			</PieceContextProvider>
		),
		getTileClassName: (x: number, y: number) =>
			(x + y) % 2 === 0 ? "even-tile" : "odd-tile",
		boardClassName: "board",
	},
};
