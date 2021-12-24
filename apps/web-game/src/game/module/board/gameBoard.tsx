import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BoardState } from "@shoki/board";
import { BoardGrid } from "@shoki/board-react";
import { AppState } from "../../../store";
import { onDropPiece, onTileClick } from "./tileInteraction";
import { InteractablePiece } from "../../components/piece/interactablePiece";
import { AnimatedPiece } from "../../components/piece/animatedPiece";

const renderAnimatedPiece = (id: string) => <AnimatedPiece id={id} />;
const renderInteractablePiece = (id: string) => <InteractablePiece id={id} />;

export const GameBoard: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const bench = useSelector<AppState, BoardState>(state => state.game.bench);
	const board = useSelector<AppState, BoardState>(state => state.game.board);
	const matchBoard = useSelector<AppState, BoardState>(state => state.game.match.board!);

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
