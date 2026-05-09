import * as React from "react";

import { useSelector } from "react-redux";
import { useGamemodeSettings } from "~/game/sessionContext";
import { AppState } from "~/store";

import { GamePhase } from "@creature-chess/models";

import { Countdown } from "../ui/countdown";

const renderPhaseInfoCountdown = (secondsRemaining: number) => (
	<span>({secondsRemaining})</span>
);

export function PhaseTimer() {
	const settings = useGamemodeSettings();
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

	const phaseLengthMs: Record<GamePhase, number> = {
		[GamePhase.PREPARING]: settings.preparingPhaseLengthMs,
		[GamePhase.READY]: settings.readyPhaseLengthMs,
		[GamePhase.PLAYING]: settings.playingPhaseMaxLengthMs,
	};

	const phaseEndTime = phaseLengthMs[phase] / 1000 + phaseStartedAtSeconds;

	return (
		<span>
			<Countdown
				countdownToSeconds={phaseEndTime}
				render={renderPhaseInfoCountdown}
			/>
		</span>
	);
}
