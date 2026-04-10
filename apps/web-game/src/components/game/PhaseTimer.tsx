import * as React from "react";

import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { GamePhase } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { Countdown } from "../ui/countdown";

// todo wire this up to the gamemode settings instead of hardcoding the phase lengths
const PHASE_LENGTHS_SECONDS: Record<GamePhase, number> = {
	[GamePhase.PREPARING]: GamemodeSettingsPresets.default.preparingPhaseLengthMs / 1000,
	[GamePhase.READY]: GamemodeSettingsPresets.default.readyPhaseLengthMs / 1000,
	[GamePhase.PLAYING]: GamemodeSettingsPresets.default.playingPhaseMaxLengthMs / 1000,
};

const renderPhaseInfoCountdown = (secondsRemaining: number) => (
	<span>({secondsRemaining})</span>
);

export function PhaseTimer() {
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

	const phaseEndTime = PHASE_LENGTHS_SECONDS[phase] + phaseStartedAtSeconds;

	return (
		<span>
			<Countdown
				countdownToSeconds={phaseEndTime}
				render={renderPhaseInfoCountdown}
			/>
		</span>
	);
}
