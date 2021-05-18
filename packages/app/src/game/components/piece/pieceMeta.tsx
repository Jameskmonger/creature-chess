import * as React from "react";
import { useSelector } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/gamemode";
import { TypeIndicator } from "@creature-chess/ui";
import { BoardSelectors } from "@shoki/board";
import { AppState } from "../../../store";
import { Healthbar } from "../healthbar";
import { StageIndicator } from "../StageIndicator";

const PieceMeta: React.FunctionComponent<{ id: string; hideHealthbar?: boolean }> = ({ id, hideHealthbar = false }) => {
	const piece = useSelector<AppState, PieceModel>(state => {
		if (state.game.match.board) {
			const matchPiece = BoardSelectors.getPiece(state.game.match.board, id);

			if (matchPiece) {
				return matchPiece;
			}
		}

		return getPiece(state.game, id);
	});

	return (
		<div className="piece-meta-container">
			<div className="piece-meta">
				<TypeIndicator type={piece.definition.type} />

				<div className="health-bar-container">
					{!hideHealthbar && <Healthbar pieceId={id} vertical />}

					<StageIndicator pieceId={id} />
				</div>
			</div>
			<div className="piece-meta-top" />
		</div>
	);
};

export { PieceMeta };
