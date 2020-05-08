import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";
import { Countdown } from "./countdown";
import { GamePhase, Constants } from "@common/models";

const PhaseInfo: React.FunctionComponent = () => {
    const phase = useSelector<AppState, GamePhase>(state => state.game.phase);
    const phaseStartedAtSeconds = useSelector<AppState, number>(state => state.game.phaseStartedAtSeconds);

    if (phase === GamePhase.WAITING) {
        return <div className="phase-info">Waiting for players</div>;
    }

    if (phase === GamePhase.DEAD) {
        return <div className="phase-info">You are dead</div>;
    }

    const phaseEndTime = Constants.PHASE_LENGTHS[phase] + phaseStartedAtSeconds;

    return <div className="phase-info">{GamePhase[phase]} - <Countdown countdownToSeconds={phaseEndTime} /></div>;
};

export { PhaseInfo };
