import React from "react";
import { BoardSelectors, BoardState } from "@shoki/board";
import { usePlayerId } from "@creature-chess/auth-web";
import { PieceContextProvider } from "@creature-chess/ui";
import { PieceModel } from "@creature-chess/models";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";

type BoardStateSelector = (state: AppState) => BoardState<PieceModel>;

type PieceWrapperProps = {
	id: string;
	boardSelectors: BoardStateSelector[];
};

export const PieceWrapper: React.FC<PieceWrapperProps> = ({ id, boardSelectors, children }) => {
	const playerId = usePlayerId();
	const spectatingId = useSelector((state: AppState) => state.game.spectating.id);

	const selector = (state: AppState) => {
		for (const boardStateSelector of boardSelectors) {
			const boardState = boardStateSelector(state);

			const boardPiece = BoardSelectors.getPiece(boardState, id);

			if (boardPiece) {
				return boardPiece;
			}
		}

		return null;
	};

	const piece = useSelector(selector);

	if (!piece) {
		return null;
	}

	const viewingPlayerId = spectatingId || playerId;

	return (
		<PieceContextProvider value={{ piece, viewingPlayerId }}>
			{children}
		</PieceContextProvider>
	);
};
