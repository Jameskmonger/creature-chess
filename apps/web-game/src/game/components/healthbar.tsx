import * as React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { usePlayerId } from "@creature-chess/auth-web";
import { GamePhase, PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/gamemode";
import { ProgressBar } from "@creature-chess/ui";
import { BoardSelectors } from "@shoki/board";
import { AppState } from "../../store";

interface HealthbarProps {
	pieceId: string;
	vertical?: boolean;
}

const getColourName = (friendly: boolean, spectating: boolean) => {
	if (friendly) {
		return "healthbar-fill-friendly";
	}

	if (spectating) {
		return "healthbar-fill-spectating";
	}

	return "healthbar-fill-enemy";
};

const Healthbar: React.FunctionComponent<HealthbarProps> = ({ pieceId, vertical = false }) => {
	const localPlayerId = usePlayerId();
	const showHealthbar = useSelector<AppState, boolean>(state => (
		state.game.roundInfo.phase === GamePhase.READY
		|| state.game.roundInfo.phase === GamePhase.PLAYING
	));
	const spectatingPlayerId = useSelector<AppState, string | null>(state => state.game.spectating.id);

	const piece = useSelector<AppState, PieceModel | null>(state => {
		if (state.game.match.board) {
			const matchPiece = BoardSelectors.getPiece(state.game.match.board, pieceId);

			if (matchPiece) {
				return matchPiece;
			}
		}

		return getPiece(state.game, pieceId);
	});

	if (!showHealthbar || !piece) {
		return null;
	}

	const { ownerId, currentHealth, maxHealth } = piece;
	const friendly = localPlayerId === ownerId;
	const spectating = spectatingPlayerId === ownerId;

	const className = classNames(
		"healthbar",
		vertical ? "healthbar-vertical" : ""
	)

	const fillClass = classNames(
		vertical ? "healthbar-fill-vertical" : "",
		getColourName(friendly, spectating)
	);

	return (
		<ProgressBar
			className={className}
			fillClassName={fillClass}
			current={currentHealth}
			max={maxHealth}
			vertical={vertical}
		/>
	);
};

export { Healthbar };
