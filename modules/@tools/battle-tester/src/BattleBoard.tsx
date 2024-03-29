import React from "react";

import { useDispatch } from "react-redux";

import { BoardSelectors } from "@shoki/board";

import { DndProvider } from "@shoki-web/board-react";

import { PieceModel } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import {
	GameBoardContextProvider,
	GameBoardContext,
	GameBoard,
	PieceContextProvider,
	MatchPiece,
	GameBoardLocation,
} from "@cc-web/ui";

import { controlSlice, useAppSelector } from "./state";

const renderPiece = (onClickPiece: any) => (piece: PieceModel) => (
	<PieceContextProvider value={{ piece, viewingPlayerId: "A" }}>
		<div
			style={{ width: "100%", height: "100%" }}
			onClick={() => onClickPiece(piece.id)}
		>
			<MatchPiece />
		</div>
	</PieceContextProvider>
);

export function BattleBoard() {
	const dispatch = useDispatch();
	const board = useAppSelector((state) => state.board);

	const context: GameBoardContext = {
		board,
		bench: {
			id: "",
			locked: false,
			size: { width: GamemodeSettingsPresets["default"].benchSize, height: 1 },
			pieces: {},
			piecePositions: {},
			pieceLimit: 0,
		},
	};

	const onClickTile = React.useCallback(
		(event: { location: GameBoardLocation }) => {
			if (event.location.locationType === "bench") {
				return;
			}

			dispatch(
				controlSlice.actions.setSelectedTile({
					tile: { x: event.location.x, y: (event.location as any).y },
				})
			);
		},
		[dispatch]
	);

	const onClickPiece = React.useCallback(
		(pieceId: string) => {
			const piecePosition = BoardSelectors.getPiecePosition(board, pieceId);

			if (!piecePosition) {
				return;
			}

			dispatch(
				controlSlice.actions.setSelectedTile({
					tile: {
						x: piecePosition.x,
						y: piecePosition.y,
					},
				})
			);
		},
		[board, dispatch]
	);

	return (
		<DndProvider>
			<GameBoardContextProvider value={context}>
				<GameBoard
					renderBoardPiece={renderPiece(onClickPiece)}
					renderBenchPiece={renderPiece(onClickPiece)}
					onClick={onClickTile}
					onDropPiece={() => {
						/* empty */
					}}
				/>
			</GameBoardContextProvider>
		</DndProvider>
	);
}
