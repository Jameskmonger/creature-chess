import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from '../store/state';

const LobbyStage: React.FunctionComponent = () => {
    const lobbyId = useSelector<AppState, string>(state => state.lobby.lobbyId);
    const localPlayerId = useSelector<AppState, string>(state => state.lobby.localPlayerId);
    const players = useSelector<AppState, ({ id: string, name: string })[]>(state => state.lobby.players);

    return (
        <div className="lobby">
            <div className="players">
                {
                    players.map(p => (
                        <div className="player">
                            <span>{p.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export { LobbyStage };