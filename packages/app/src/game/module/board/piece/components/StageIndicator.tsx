import * as React from "react";
import { useSelector } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/gamemode";
import { AppState } from "../../../../../store";
import { BoardSelectors } from "@creature-chess/board";

interface StageIndicatorProps {
	pieceId: string;
}

const StageIndicator: React.FunctionComponent<StageIndicatorProps> = ({ pieceId }) => {
	const piece = useSelector<AppState, PieceModel>(state => {
		if (state.game.match.board) {
			return BoardSelectors.getPiece(state.game.match.board, pieceId);
		}

		return getPiece(state.game, pieceId);
	});

	if (!piece || piece.stage === 0) {
		return null;
	}

	const stars: React.ReactNode[] = [];

	for (let i = 0; i <= piece.stage; i++) {
		stars.push(<img key={i} src="https://creaturechess.jamesmonger.com/images/ui/star.svg" />);
	}

	return <div className="piece-stage">{stars}</div>;
};

export { StageIndicator };
