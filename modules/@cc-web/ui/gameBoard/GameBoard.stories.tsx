import React from "react";

import { Meta, Story } from "@storybook/react";

import { createInitialBoardState } from "@shoki/board";

import { DndProvider } from "@shoki-web/board-react";

import { Builders, GRID_SIZE, PieceModel } from "@creature-chess/models";

import { Piece, PieceContextProvider } from "../piece";
import { GameBoard } from "./GameBoard";
import { GameBoardContextProvider } from "./GameBoardContext";

export default {
	title: "@ui / GameBoard",
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
			width: GRID_SIZE.width,
			height: args.boardHeight,
		}),
		bench: createInitialBoardState<PieceModel>("bench", {
			width: GRID_SIZE.width,
			height: 1,
		}),
	};

	const piece = Builders.buildPieceModel();

	context.board.pieces = {
		[piece.id]: piece,
	};

	context.board.piecePositions = {
		"4,4": piece.id,
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
	boardHeight: GRID_SIZE.height / 2,
};

export const Portrait_FullBoard = Template.bind({});
Portrait_FullBoard.args = {
	width: "300px",
	height: "500px",
	boardHeight: GRID_SIZE.height,
};

export const Landscape_HalfBoard = Template.bind({});
Landscape_HalfBoard.args = {
	width: "500px",
	height: "300px",
	boardHeight: GRID_SIZE.height / 2,
};

export const Landscape_FullBoard = Template.bind({});
Landscape_FullBoard.args = {
	width: "500px",
	height: "300px",
	boardHeight: GRID_SIZE.height,
};

export const Square_HalfBoard = Template.bind({});
Square_HalfBoard.args = {
	width: "400px",
	height: "400px",
	boardHeight: GRID_SIZE.height / 2,
};

export const Square_FullBoard = Template.bind({});
Square_FullBoard.args = {
	width: "400px",
	height: "400px",
	boardHeight: GRID_SIZE.height,
};
