import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BoardGrid } from "@shoki/board-react";
import { AnimatedPiece } from "@creature-chess/ui";
import { AppState } from "../../../store";
import { onDropPiece, onTileClick } from "./tileInteraction";
import { InteractablePiece } from "./InteractablePiece";
import { PieceWrapper } from "./PieceWrapper";

const boardSelector = (state: AppState) => state.game.board;
const benchSelector = (state: AppState) => state.game.bench;
const matchBoardSelector = (state: AppState) => state.game.match.board!;

const boardBenchSelectors = [boardSelector, benchSelector];

const renderAnimatedPiece = (id: string) => <PieceWrapper id={id} boardSelectors={[matchBoardSelector]}><AnimatedPiece /></PieceWrapper>;
const renderInteractablePiece = (id: string) => <PieceWrapper id={id} boardSelectors={boardBenchSelectors}><InteractablePiece /></PieceWrapper>;

export const GameBoard: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const board = useSelector(boardSelector);
	const bench = useSelector(benchSelector);
	const matchBoard = useSelector(matchBoardSelector);

	if (matchBoard) {
		return (
			<div className="board-tiles">
				<BoardGrid
					state={matchBoard}
					renderItem={renderAnimatedPiece}
				/>
			</div>
		);
	}

	return (
		<div className="board-tiles">
			<BoardGrid
				state={board}
				onDrop={onDropPiece(dispatch, "board", board, bench)}
				onClick={onTileClick(dispatch, "board")}
				renderItem={renderInteractablePiece}
			/>
		</div>
	);
};
