import React from "react";

import { GameBoard, GameBoardContextProvider } from "@cc-web/ui";

import {
	useGameBench,
	useGameMatchBoard,
	useRenderBenchPiece,
	useRenderMatchBoardPiece,
	useOnClickTile,
	useOnDropPiece,
} from "./hooks";

export function MatchBoard() {
	const board = useGameMatchBoard();
	const bench = useGameBench();

	const renderBoardPiece = useRenderMatchBoardPiece();
	const renderBenchPiece = useRenderBenchPiece();

	const onClickTile = useOnClickTile({ canClickBoard: false });
	const onDropPiece = useOnDropPiece(board, bench);

	if (!board) {
		return null;
	}

	return (
		<GameBoardContextProvider value={{ board, bench }}>
			<GameBoard
				onClick={onClickTile}
				onDropPiece={onDropPiece}
				renderBoardPiece={renderBoardPiece}
				renderBenchPiece={renderBenchPiece}
			/>
		</GameBoardContextProvider>
	);
}
