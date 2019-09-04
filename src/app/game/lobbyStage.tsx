import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from '../store/state';
import { LOBBY_WAIT_TIME, MAX_PLAYERS_IN_GAME } from '@common/constants';

const LobbyStage: React.FunctionComponent = () => {
    const lobbyId = useSelector<AppState, string>(state => state.lobby.lobbyId);
    const localPlayerId = useSelector<AppState, string>(state => state.lobby.localPlayerId);
    const players = useSelector<AppState, ({ id: string, name: string })[]>(state => state.lobby.players);

    return (
        <div className="lobby">
            <div className="lobby-info">
                <div className="players">
                    {
                        players.map(p => (
                            <div className="player">
                                <span>{p.name}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="text">
                    <p>The game will start {LOBBY_WAIT_TIME} seconds after the lobby is created,</p>
                    <p>or immediately when there are {MAX_PLAYERS_IN_GAME} players</p>
                </div>
            </div>

            <div className="github-link"><a href="https://reddit.com/r/creaturechess/">/r/CreatureChess</a> - <a href="https://github.com/Jameskmonger/creature-chess">Source and Licenses on GitHub</a></div>
        </div>
    )
};

export { LobbyStage };