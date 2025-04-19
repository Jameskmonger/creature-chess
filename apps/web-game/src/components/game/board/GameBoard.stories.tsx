import React from "react";

import { Meta, Story } from "@storybook/react";

import { createInitialBoardState } from "@shoki/board";

import { DndProvider } from "@shoki-web/board-react";

import { Builders, PieceModel } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

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
		board: createInitialBoardState<PieceModel>("board", {
			width: GamemodeSettingsPresets["default"].boardWidth,
			height: args.boardHeight,
		}),
		bench: createInitialBoardState<PieceModel>("bench", {
			width: GamemodeSettingsPresets["default"].benchSize,
			height: 1,
		}),
	};

	const piece1 = Builders.buildPieceModel({ id: "1" });
	const piece2 = Builders.buildPieceModel({ id: "2" });
	const piece3 = Builders.buildPieceModel({ id: "3" });
	const piece4 = Builders.buildPieceModel({ id: "4" });
	const piece5 = Builders.buildPieceModel({ id: "5" });

	context.board.pieces = {
		[piece1.id]: piece1,
		[piece2.id]: piece2,
		[piece3.id]: piece3,
		[piece4.id]: piece4,
		[piece5.id]: piece5,
	};

	context.board.piecePositions = {
		[`${GamemodeSettingsPresets["default"].boardWidth - 1},${
			args.boardHeight - 1
		}`]: piece1.id,
		[`${GamemodeSettingsPresets["default"].boardWidth - 2},${
			args.boardHeight - 1
		}`]: piece2.id,
		[`${GamemodeSettingsPresets["default"].boardWidth - 4},0`]: piece3.id,
		[`${GamemodeSettingsPresets["default"].boardWidth - 4},${
			args.boardHeight - 1
		}`]: piece4.id,
		["0,0"]: piece5.id,
	};

	const benchPiece1 = Builders.buildPieceModel({ id: "6" });
	const benchPiece2 = Builders.buildPieceModel({ id: "6" });

	context.bench.pieces = {
		[benchPiece1.id]: benchPiece1,
		[benchPiece2.id]: benchPiece2,
	};

	context.bench.piecePositions = {
		["0,0"]: benchPiece1.id,
		[`${GamemodeSettingsPresets["default"].benchSize - 1},0`]: benchPiece2.id,
	};

	return (
		<DndProvider>
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
					/>
				</GameBoardContextProvider>
			</div>
		</DndProvider>
	);
};

export const Portrait_HalfBoard = Template.bind({});
Portrait_HalfBoard.args = {
	width: "300px",
	height: "500px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight,
};

export const Portrait_FullBoard = Template.bind({});
Portrait_FullBoard.args = {
	width: "300px",
	height: "500px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight * 2,
};

export const Landscape_HalfBoard = Template.bind({});
Landscape_HalfBoard.args = {
	width: "500px",
	height: "300px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight,
};

export const Landscape_FullBoard = Template.bind({});
Landscape_FullBoard.args = {
	width: "500px",
	height: "300px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight * 2,
};

export const Square_HalfBoard = Template.bind({});
Square_HalfBoard.args = {
	width: "400px",
	height: "400px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight,
};

export const Square_FullBoard = Template.bind({});
Square_FullBoard.args = {
	width: "400px",
	height: "400px",
	boardHeight: GamemodeSettingsPresets["default"].boardHalfHeight * 2,
};
