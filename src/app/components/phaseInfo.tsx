import * as React from "react";
import { GamePhase, Constants } from "@common";
import { MapStateToProps, connect } from "react-redux";
import { AppState } from "../store/state";

interface Props {
    phase: GamePhase;
    phaseStartedAtSeconds: number;
}

const PhaseInfoUnconnected: React.FunctionComponent<Props> = ({ phase, phaseStartedAtSeconds }) => {
    const [phaseTimeRemaining, setPhaseTimeRemaining] = React.useState<number | null>(null);

    const updateTimeRemaining = () => {
        if (phaseStartedAtSeconds === null) {
            return;
        }

        const currentSeconds = Math.floor(Date.now() / 1000);
        const phaseEndTime = Constants.PHASE_LENGTHS[phase] + phaseStartedAtSeconds;

        setPhaseTimeRemaining(phaseEndTime - currentSeconds);
    };

    React.useEffect(() => {
        updateTimeRemaining();

        const intervalId = setInterval(updateTimeRemaining, 1000);

        return () => clearInterval(intervalId);

    }, [phase, phaseStartedAtSeconds]);

    if (phase === GamePhase.WAITING) {
        return <div className="phase-info">Waiting for players</div>;
    }

    if (phase === GamePhase.DEAD) {
        return <div className="phase-info">You are dead</div>;
    }

    return <div className="phase-info">{GamePhase[phase]} - {phaseTimeRemaining}</div>;
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    phase: state.game.phase,
    phaseStartedAtSeconds: state.game.phaseStartedAtSeconds
});

const PhaseInfo = connect(mapStateToProps)(PhaseInfoUnconnected);

export { PhaseInfo };
