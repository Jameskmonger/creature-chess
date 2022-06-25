import React from "react";

import { GameBoard, GameBoardContextProvider } from "@creature-chess/ui";

import {
	useGameBench,
	useGameBoard,
	useRenderBoardPiece,
	useRenderBenchPiece,
	useOnClickTile,
	useOnDropPiece,
} from "./hooks";

export const LocalBoard: React.FC = () => {
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
};
