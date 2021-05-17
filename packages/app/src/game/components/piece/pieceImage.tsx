import * as React from "react";
import { useSelector } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/gamemode";
import { AppState } from "../../../store";
import { CreatureImage } from "../../../display/creatureImage";
import { BoardSelectors } from "@shoki/board";

interface PieceImageProps {
	pieceId: string;
}

const PieceImage: React.FunctionComponent<PieceImageProps> = ({ pieceId }) => {
	const piece = useSelector<AppState, PieceModel>(state => {
		if (state.game.match.board) {
			const matchPiece = BoardSelectors.getPiece(state.game.match.board, pieceId);

			if (matchPiece) {
				return matchPiece;
			}
		}

		return getPiece(state.game, pieceId);
	});

	if (!piece) {
		return null;
	}

	return <CreatureImage definitionId={piece.definitionId} facing={piece.facingAway ? "back" : "front"} />;
};

export { PieceImage };
