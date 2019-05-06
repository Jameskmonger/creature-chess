import * as React from "react";
import { GamePhase } from "@common";
import { MapStateToProps, connect } from "react-redux";
import { AppState } from "../store/store";

interface Props {
    phase: GamePhase;
    phaseTimer: number;
}

const PhaseInfoUnconnected: React.FunctionComponent<Props> = ({ phase, phaseTimer }) => {
    if (phase === GamePhase.WAITING) {
        return <div className="phase-info">Waiting for players</div>;
    }

    return <div className="phase-info">{GamePhase[phase]} - {phaseTimer}</div>;
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    phase: state.game.phase,
    phaseTimer: state.game.phaseTimer
});

const PhaseInfo = connect(mapStateToProps)(PhaseInfoUnconnected);

export { PhaseInfo };
