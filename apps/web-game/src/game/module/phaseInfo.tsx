import * as React from "react";
import { useSelector } from "react-redux";
import { GamePhase, Constants } from "@creature-chess/models";
import { Countdown } from "@creature-chess/ui";
import { AppState } from "../../store";

const renderPhaseInfoCountdown = (secondsRemaining: number) => <span className="highlight">({secondsRemaining})</span>;

const PhaseInfo: React.FunctionComponent = () => {
	const phase = useSelector<AppState, GamePhase | null>(state => state.game.roundInfo.phase);
	const phaseStartedAtSeconds = useSelector<AppState, number | null>(state => state.game.roundInfo.phaseStartedAtSeconds);
	const isDead = useSelector<AppState, boolean>(state => state.game.playerInfo.health === 0);

	if (isDead) {
		return <div className="phase-info">You are dead</div>;
	}

	if (!phase || !phaseStartedAtSeconds) {
		return null;
	}

	const phaseEndTime = Constants.PHASE_LENGTHS[phase] + phaseStartedAtSeconds;

	return <div className="phase-info">{GamePhase[phase]} <Countdown countdownToSeconds={phaseEndTime} render={renderPhaseInfoCountdown} /></div>;
};

export { PhaseInfo };
