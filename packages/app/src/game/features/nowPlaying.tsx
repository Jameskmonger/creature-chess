import { GamePhase } from "packages/models/lib";
import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";

const getOpponentName = (state: AppState): string =>
    state.playerList.find(p => p.id === state.playerInfo.opponentId)?.name;

const NowPlaying: React.FunctionComponent = () => {
    const phase = useSelector<AppState, GamePhase>(state => state.game.phase);
    const opponentName = useSelector<AppState, string>(getOpponentName);

    if (phase !== GamePhase.READY && phase !== GamePhase.PLAYING) {
        return null;
    }

    if (!opponentName) {
        return null;
    }

    return <div className="now-playing"><span className="label">Now Playing: {opponentName}</span></div>
};

export { NowPlaying };
