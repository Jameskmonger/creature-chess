import React from "react";

import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { GamePhase } from "@creature-chess/models";

import { GameBoard } from "./GameBoard";
import { GameBoardContextProvider } from "./GameBoardContext";
import {
	useGameBench,
	useGameBoard,
	useRenderBoardPiece,
	useRenderBenchPiece,
	useOnClickTile,
	useOnDropPiece,
} from "./hooks";

export function LocalBoard({ children }: { children?: React.ReactNode }) {
	const board = useGameBoard();
	const bench = useGameBench();

	const renderBoardPiece = useRenderBoardPiece();
	const renderBenchPiece = useRenderBenchPiece();

	const onClickTile = useOnClickTile();
	const onDropPiece = useOnDropPiece(board, bench);

	const isPreparing = useSelector<AppState, boolean>(
		(state) => state.game.roundInfo.phase === GamePhase.PREPARING
	);

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
				showFiller={isPreparing}
			>
				{children}
			</GameBoard>
		</GameBoardContextProvider>
	);
}
