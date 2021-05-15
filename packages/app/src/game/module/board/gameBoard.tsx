import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GamePhase } from "@creature-chess/models";
import { BoardState } from "@creature-chess/board";
import { BoardGrid } from "@creature-chess/board-react";
import { AppState } from "../../../store";
import { PieceComponent } from "./piece/pieceComponent";
import { onDropPiece, onTileClick } from "./tileInteraction";

export const GameBoard: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const bench = useSelector<AppState, BoardState>(state => state.game.bench);
	const board = useSelector<AppState, BoardState>(state => state.game.board);
	const matchBoard = useSelector<AppState, BoardState>(state => state.game.match.board);

	const selectedPieceId = useSelector<AppState, string | null>(state => state.game.ui.selectedPieceId);
	const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.roundInfo.phase === GamePhase.PREPARING);

	const renderBoardPiece = (id: string) => (
		<PieceComponent
			id={id}
			draggable={inPreparingPhase}
			animate={!inPreparingPhase}
			selected={id === selectedPieceId}
			pieceIsOnBench={false}
		/>
	);

	if (matchBoard) {
		return (
			<div className="board-tiles">
				<BoardGrid
					state={matchBoard}
					renderItem={renderBoardPiece}
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
				renderItem={renderBoardPiece}
			/>
		</div>
	);
};
