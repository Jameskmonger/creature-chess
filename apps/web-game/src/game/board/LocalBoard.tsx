import React from "react";

import { GameBoard, GameBoardContextProvider } from "@cc-web/ui";

import {
	useGameBench,
	useGameBoard,
	useRenderBoardPiece,
	useRenderBenchPiece,
	useOnClickTile,
	useOnDropPiece,
} from "./hooks";

export function LocalBoard() {
	const board = useGameBoard();
	const bench = useGameBench();

	const renderBoardPiece = useRenderBoardPiece();
	const renderBenchPiece = useRenderBenchPiece();

	const onClickTile = useOnClickTile();
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
