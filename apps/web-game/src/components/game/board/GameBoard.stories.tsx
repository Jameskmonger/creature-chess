import React from "react";

import { Meta, Story } from "@storybook/react";
import { PieceDragContextProvider } from "~/components/board/drag/PieceDragContext";

import { SubscribableBoard } from "@creature-chess/board";
import { Builders, PieceModel } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { GameBoard } from "./GameBoard";
import { GameBoardContextProvider } from "./GameBoardContext";
import { Piece, PieceContextProvider } from "./piece";

export default {
	title: "@creature-chess / game / Board / GameBoard",
	component: GameBoard,
	argTypes: {
		onClick: { action: "onClick" },
		onDropPiece: { action: "onDropPiece" },
	},
} as Meta;

const renderPiece = (piece: PieceModel) => (
	<PieceContextProvider value={{ piece, viewingPlayerId: piece.ownerId }}>
		<Piece healthbar="none" />
	</PieceContextProvider>
);

const Template: Story<any> = (args) => {
	const context = {
		board: new SubscribableBoard(
			GamemodeSettingsPresets["default"].boardWidth,
			args.boardHeight
		),
		bench: new SubscribableBoard(
			GamemodeSettingsPresets["default"].benchSize,
			1
		),
		pieceRegistry: new PieceRegistry(),
	};

	const piece1 = Builders.buildPieceModel({ id: "1" });
	const piece2 = Builders.buildPieceModel({ id: "2" });
	const piece3 = Builders.buildPieceModel({ id: "3" });
	const piece4 = Builders.buildPieceModel({ id: "4" });
	const piece5 = Builders.buildPieceModel({ id: "5" });

	context.board.setPieces([
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

	context.bench.setPieces([
		{ id: benchPiece1.id, x: 0, y: 0 },
		{
			id: benchPiece2.id,
			x: GamemodeSettingsPresets["default"].benchSize - 1,
			y: 0,
		},
	]);

	context.pieceRegistry.registerPiece(piece1);
	context.pieceRegistry.registerPiece(piece2);
	context.pieceRegistry.registerPiece(piece3);
	context.pieceRegistry.registerPiece(piece4);
	context.pieceRegistry.registerPiece(piece5);
	context.pieceRegistry.registerPiece(benchPiece1);
	context.pieceRegistry.registerPiece(benchPiece2);

	return (
		<PieceDragContextProvider>
			<div
				style={{
					width: args.width,
					height: args.height,
					border: "2px solid red",
				}}
			>
				<GameBoardContextProvider value={context}>
					<GameBoard
						renderBoardPiece={renderPiece}
						renderBenchPiece={renderPiece}
						onClick={args.onClick}
						onDropPiece={args.onDropPiece}
						showFiller={args.showFiller}
					/>
				</GameBoardContextProvider>
			</div>
		</PieceDragContextProvider>
	);
};

export const Portrait_HalfBoard = Template.bind({});
Portrait_HalfBoard.args = {
	width: "300px",
	height: "500px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight,
	showFiller: true,
};

export const Portrait_FullBoard = Template.bind({});
Portrait_FullBoard.args = {
	width: "300px",
	height: "500px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight * 2,
	showFiller: false,
};

export const Landscape_HalfBoard = Template.bind({});
Landscape_HalfBoard.args = {
	width: "500px",
	height: "300px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight,
	showFiller: true,
};

export const Landscape_FullBoard = Template.bind({});
Landscape_FullBoard.args = {
	width: "500px",
	height: "300px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight * 2,
	showFiller: false,
};

export const Square_HalfBoard = Template.bind({});
Square_HalfBoard.args = {
	width: "400px",
	height: "400px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight,
	showFiller: true,
};

export const Square_FullBoard = Template.bind({});
Square_FullBoard.args = {
	width: "400px",
	height: "400px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight * 2,
	showFiller: false,
};
