import * as React from "react";
import { GamePhase, Constants } from "@common";
import { MapStateToProps, connect } from "react-redux";
import { AppState } from "../store/state";
import { Countdown } from "./countdown";

interface Props {
    phase: GamePhase;
    phaseStartedAtSeconds: number;
}

const PhaseInfoUnconnected: React.FunctionComponent<Props> = ({ phase, phaseStartedAtSeconds }) => {
    if (phase === GamePhase.WAITING) {
        return <div className="phase-info">Waiting for players</div>;
    }

    if (phase === GamePhase.DEAD) {
        return <div className="phase-info">You are dead</div>;
    }

    const phaseEndTime = Constants.PHASE_LENGTHS[phase] + phaseStartedAtSeconds;

    return <div className="phase-info">{GamePhase[phase]} - <Countdown countdownToSeconds={phaseEndTime} /></div>;
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    phase: state.game.phase,
    phaseStartedAtSeconds: state.game.phaseStartedAtSeconds
});

const PhaseInfo = connect(mapStateToProps)(PhaseInfoUnconnected);

export { PhaseInfo };
