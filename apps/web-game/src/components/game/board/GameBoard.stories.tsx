import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { PieceDragContextProvider } from "~/components/board/drag/PieceDragContext";

import { SubscribableBoard } from "@creature-chess/board";
import { Builders, PieceModel } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { GameBoard } from "./GameBoard";
import { Piece } from "./piece";

const renderPiece = (piece: PieceModel) => <Piece piece={piece} />;

const meta: Meta<any> = {
	title: "@creature-chess / game / Board / GameBoard",
	component: GameBoard,
	argTypes: {
		onClick: { action: "onClick" },
		onDropPiece: { action: "onDropPiece" },
	},
	render: (args) => {
		const board = new SubscribableBoard(
			GamemodeSettingsPresets["default"].boardWidth,
			args.boardHeight
		);
		const bench = new SubscribableBoard(
			GamemodeSettingsPresets["default"].benchSize,
			1
		);
		const pieceRegistry = new PieceRegistry();

		const piece1 = Builders.buildPieceModel({ id: "1" });
		const piece2 = Builders.buildPieceModel({ id: "2" });
		const piece3 = Builders.buildPieceModel({ id: "3" });
		const piece4 = Builders.buildPieceModel({ id: "4" });
		const piece5 = Builders.buildPieceModel({ id: "5" });

		board.setPieces([
			{
				id: piece1.id,
				x: GamemodeSettingsPresets["default"].boardWidth - 1,
				y: args.boardHeight - 1,
			},
			{
				id: piece2.id,
				x: GamemodeSettingsPresets["default"].boardWidth - 2,
				y: args.boardHeight - 1,
			},
			{
				id: piece3.id,
				x: GamemodeSettingsPresets["default"].boardWidth - 4,
				y: 0,
			},
			{
				id: piece4.id,
				x: GamemodeSettingsPresets["default"].boardWidth - 4,
				y: args.boardHeight - 1,
			},
			{
				id: piece5.id,
				x: 0,
				y: 0,
			},
		]);

		const benchPiece1 = Builders.buildPieceModel({ id: "6" });
		const benchPiece2 = Builders.buildPieceModel({ id: "6" });

		bench.setPieces([
			{ id: benchPiece1.id, x: 0, y: 0 },
			{
				id: benchPiece2.id,
				x: GamemodeSettingsPresets["default"].benchSize - 1,
				y: 0,
			},
		]);

		pieceRegistry.registerPiece(piece1);
		pieceRegistry.registerPiece(piece2);
		pieceRegistry.registerPiece(piece3);
		pieceRegistry.registerPiece(piece4);
		pieceRegistry.registerPiece(piece5);
		pieceRegistry.registerPiece(benchPiece1);
		pieceRegistry.registerPiece(benchPiece2);

		return (
			<PieceDragContextProvider>
				<div
					style={{
						width: args.width,
						height: args.height,
						border: "2px solid red",
					}}
				>
					<GameBoard
						board={board}
						bench={bench}
						pieceRegistry={pieceRegistry}
						renderBoardPiece={renderPiece}
						renderBenchPiece={renderPiece}
						onClick={args.onClick}
						onDropPiece={args.onDropPiece}
						boardDraggable
						benchDraggable
						showFiller={args.showFiller}
					/>
				</div>
			</PieceDragContextProvider>
		);
	},
};
export default meta;

type Story = StoryObj<any>;

export const Portrait_HalfBoard: Story = {
	args: {
		width: "300px",
		height: "500px",
		boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight,
		showFiller: true,
	},
};

export const Portrait_FullBoard: Story = {
	args: {
		width: "300px",
		height: "500px",
		boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight * 2,
		showFiller: false,
	},
};

export const Landscape_HalfBoard: Story = {
	args: {
		width: "500px",
		height: "300px",
		boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight,
		showFiller: true,
	},
};

export const Landscape_FullBoard: Story = {
	args: {
		width: "500px",
		height: "300px",
		boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight * 2,
		showFiller: false,
	},
};

export const Square_HalfBoard: Story = {
	args: {
		width: "400px",
		height: "400px",
		boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight,
		showFiller: true,
	},
};

export const Square_FullBoard: Story = {
	args: {
		width: "400px",
		height: "400px",
		boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight * 2,
		showFiller: false,
	},
};
