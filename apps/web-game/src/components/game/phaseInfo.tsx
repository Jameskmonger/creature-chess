import * as React from "react";

import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { GamePhase } from "@creature-chess/models";
import { GAME_PHASE_LENGTHS } from "@creature-chess/models/config";

import { Countdown } from "../ui/countdown";

const renderPhaseInfoCountdown = (secondsRemaining: number) => (
	<span>({secondsRemaining})</span>
);

const PhaseInfo = () => {
	const phase = useSelector<AppState, GamePhase | null>(
		(state) => state.game.roundInfo.phase
	);
	const phaseStartedAtSeconds = useSelector<AppState, number | null>(
		(state) => state.game.roundInfo.phaseStartedAtSeconds
	);
	const isDead = useSelector<AppState, boolean>(
		(state) => state.game.playerInfo.health === 0
	);

	if (isDead) {
		return <span>GAME OVER</span>;
	}

	if (phase === null || !phaseStartedAtSeconds) {
		return null;
	}

	const phaseEndTime = GAME_PHASE_LENGTHS[phase] + phaseStartedAtSeconds;

	return (
		<span>
			{GamePhase[phase]}{" "}
			<Countdown
				countdownToSeconds={phaseEndTime}
				render={renderPhaseInfoCountdown}
			/>
		</span>
	);
};

export { PhaseInfo };
