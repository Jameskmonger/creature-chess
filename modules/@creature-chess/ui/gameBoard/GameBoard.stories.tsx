import React from "react";

import { Meta, Story } from "@storybook/react";

import { createInitialBoardState } from "@shoki/board";
import { DndProvider } from "@shoki/board-react";

import { Builders, GRID_SIZE, PieceModel } from "@creature-chess/models";

import { Piece, PieceContextProvider } from "../piece";
import { GameBoard } from "./GameBoard";
import { GameBoardContextProvider } from "./GameBoardContext";

export default {
	title: "GameBoard",
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
			height: GRID_SIZE.height,
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
			<div style={{ width: "500px", height: "800px" }}>
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

export const Default = Template.bind({});
Default.args = {};
