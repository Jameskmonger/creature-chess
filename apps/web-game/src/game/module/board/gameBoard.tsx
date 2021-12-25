import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BoardSelectors, BoardState } from "@shoki/board";
import { BoardGrid } from "@shoki/board-react";
import { AnimatedPiece, PieceContextProvider } from "@creature-chess/ui";
import { AppState } from "../../../store";
import { onDropPiece, onTileClick } from "./tileInteraction";
import { InteractablePiece } from "../../components/piece/interactablePiece";
import { PieceModel } from "@creature-chess/models";
import { usePlayerId } from "@creature-chess/auth-web";

const AnimatedPieceWrapper: React.FC<{ id: string }> = ({ id }) => {
	const playerId = usePlayerId();
	const spectatingId = useSelector<AppState, string | null>(state => state.game.spectating.id);
	const piece = useSelector<AppState, PieceModel>(state => BoardSelectors.getPiece(state.game.match.board!, id)!);

	const viewingPlayerId = spectatingId || playerId;

	return (
		<PieceContextProvider value={{ piece, viewingPlayerId }}>
			<AnimatedPiece />
		</PieceContextProvider>
	);
};

const renderAnimatedPiece = (id: string) => <AnimatedPieceWrapper id={id} />;
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
