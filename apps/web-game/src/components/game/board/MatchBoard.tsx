import React from "react";

import { GameBoard } from "./GameBoard";
import { GameBoardContextProvider } from "./GameBoardContext";
import {
	useGameBench,
	useGameMatchBoard,
	useRenderBenchPiece,
	useRenderMatchBoardPiece,
	useOnClickTile,
	useOnDropPiece,
} from "./hooks";

export function MatchBoard({ children }: { children?: React.ReactNode }) {
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
			>
				{children}
			</GameBoard>
		</GameBoardContextProvider>
	);
}
