import * as React from "react";

import { useSelector } from "react-redux";
import { useGamemodeSettings } from "~/game/sessionContext";
import { Region } from "~/plugins";
import { AppState } from "~/store";
import { useLocalPlayer } from "~/store/game/players";

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
	const gameOver = useLocalPlayer()?.health === 0;

	const phaseLengthMs: Record<GamePhase, number> = {
		[GamePhase.PREPARING]: settings.preparingPhaseLengthMs,
		[GamePhase.READY]: settings.readyPhaseLengthMs,
		[GamePhase.PLAYING]: settings.playingPhaseMaxLengthMs,
	};

	const phaseDurationSeconds =
		phase === null || !phaseStartedAtSeconds
			? null
			: phaseLengthMs[phase] / 1000;
	const phaseEndTimeSeconds =
		phase === null || !phaseStartedAtSeconds || phaseDurationSeconds === null
			? null
			: phaseDurationSeconds + phaseStartedAtSeconds;

	let content: React.ReactNode = null;
	if (gameOver) {
		content = <span>GAME OVER</span>;
	} else if (phaseEndTimeSeconds !== null) {
		content = (
			<span>
				<Countdown
					countdownToSeconds={phaseEndTimeSeconds}
					render={renderPhaseInfoCountdown}
				/>
			</span>
		);
	}

	return (
		<Region
			cls="phase-timer"
			ctx={{ phaseEndTimeSeconds, phaseDurationSeconds, gameOver }}
		>
			{content}
		</Region>
	);
}
