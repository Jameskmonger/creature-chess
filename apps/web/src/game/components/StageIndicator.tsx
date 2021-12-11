import * as React from "react";
import { useSelector } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/gamemode";
import { BoardSelectors } from "@shoki/board";
import { AppState } from "../../store";

interface StageIndicatorProps {
	pieceId: string;
}

const StageIndicator: React.FunctionComponent<StageIndicatorProps> = ({ pieceId }) => {
	const piece = useSelector<AppState, PieceModel>(state => {
		if (state.game.match.board) {
			const matchPiece = BoardSelectors.getPiece(state.game.match.board, pieceId);

			if (matchPiece) {
				return matchPiece;
			}
		}

		return getPiece(state.game, pieceId);
	});

	if (!piece || piece.stage === 0) {
		return null;
	}

	const stars: React.ReactNode[] = [];

	for (let i = 0; i <= piece.stage; i++) {
		stars.push(<img key={i} src="https://creaturechess.com/images/ui/star.svg" />);
	}

	return <div className="piece-stage">{stars}</div>;
};

export { StageIndicator };
