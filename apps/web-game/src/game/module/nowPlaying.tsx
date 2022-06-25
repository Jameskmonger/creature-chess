import * as React from "react";
import { useSelector } from "react-redux";
import { GamePhase } from "@creature-chess/models";
import { AppState } from "../../store";

const getOpponentName = (state: AppState) =>
	state.game.playerList.find(p => p.id === state.game.playerInfo.opponentId)?.name || null;

const NowPlaying: React.FunctionComponent = () => {
	const phase = useSelector<AppState, GamePhase | null>(state => state.game.roundInfo.phase);
	const opponentName = useSelector<AppState, string | null>(getOpponentName);

	if (phase !== GamePhase.READY && phase !== GamePhase.PLAYING) {
		return null;
	}

	if (!opponentName) {
		return null;
	}

	return <span>Now Playing: {opponentName}</span>;
};

export { NowPlaying };
