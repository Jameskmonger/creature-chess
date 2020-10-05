import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { Countdown } from "../../display/countdown";
import { GamePhase, Constants } from "@creature-chess/models";

const renderPhaseInfoCountdown = (secondsRemaining: number) => <span className="highlight">({secondsRemaining})</span>;

const PhaseInfo: React.FunctionComponent = () => {
    const phase = useSelector<AppState, GamePhase>(state => state.gameInfo.phase);
    const phaseStartedAtSeconds = useSelector<AppState, number>(state => state.gameInfo.phaseStartedAtSeconds);

    if (phase === GamePhase.WAITING) {
        return <div className="phase-info">Waiting for players</div>;
    }

    if (phase === GamePhase.DEAD) {
        return <div className="phase-info">You are dead</div>;
    }

    const phaseEndTime = Constants.PHASE_LENGTHS[phase] + phaseStartedAtSeconds;

    return <div className="phase-info">{GamePhase[phase]} <Countdown countdownToSeconds={phaseEndTime} render={renderPhaseInfoCountdown} /></div>;
};

export { PhaseInfo };
