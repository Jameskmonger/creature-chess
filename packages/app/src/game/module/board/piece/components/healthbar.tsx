import * as React from "react";
import { useSelector } from "react-redux";
import { GamePhase, PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/gamemode";
import { BoardSelectors } from "@shoki/board";
import { AppState } from "../../../../../store";
import { ProgressBar } from "../../../../../display";
import { usePlayerId } from "../../../../../auth";

interface HealthbarProps {
	pieceId: string;
	pieceIsOnBench?: boolean;
	vertical?: boolean;
}

const getColourName = (friendly: boolean, spectating: boolean) => {
	if (friendly) {
		return "friendly";
	}

	if (spectating) {
		return "spectating";
	}

	return "enemy";
};

const Healthbar: React.FunctionComponent<HealthbarProps> = ({ pieceId, vertical = false, pieceIsOnBench = false }) => {
	const localPlayerId = usePlayerId();
	const showHealthbar = useSelector<AppState, boolean>(state => (
		state.game.roundInfo.phase === GamePhase.READY
		|| state.game.roundInfo.phase === GamePhase.PLAYING
	));
	const spectatingPlayerId = useSelector<AppState, string>(state => state.game.spectating.id);

	const piece = useSelector<AppState, PieceModel>(state => {
		if (state.game.match.board) {
			return BoardSelectors.getPiece(state.game.match.board, pieceId);
		}

		return getPiece(state.game, pieceId);
	});

	if (!showHealthbar || !piece || pieceIsOnBench) {
		return null;
	}

	const { ownerId, currentHealth, maxHealth } = piece;
	const friendly = localPlayerId === ownerId;
	const spectating = spectatingPlayerId === ownerId;

	return (
		<ProgressBar
			className={`healthbar ${getColourName(friendly, spectating)} ${vertical ? "vertical" : ""}`}
			current={currentHealth}
			max={maxHealth}
			vertical={vertical}
		/>
	);
};

export { Healthbar };
