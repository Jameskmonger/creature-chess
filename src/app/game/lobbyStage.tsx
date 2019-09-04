import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from '../store/state';
import { LOBBY_WAIT_TIME, MAX_PLAYERS_IN_GAME } from '@common/constants';
import { LobbyPlayer } from '@common/models';

const padNumberToTwo = (val: number) => val < 10 ? `0${val}` : val.toString();

const TimeRemaining: React.FunctionComponent<{ totalSecondsRemaining: number }> = ({ totalSecondsRemaining }) => {
    if (totalSecondsRemaining === null) {
        return null;
    }

    const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
    const secondsRemaining = Math.ceil(totalSecondsRemaining % 60);

    const time = `${minutesRemaining}:${padNumberToTwo(secondsRemaining)}`;

    return (
        <div className="timeRemaining">
            Game starting in <span className="time">{time}</span>
        </div>
    );
};

const LobbyStage: React.FunctionComponent = () => {
    const lobbyId = useSelector<AppState, string>(state => state.lobby.lobbyId);
    const localPlayerId = useSelector<AppState, string>(state => state.lobby.localPlayerId);
    const players = useSelector<AppState, LobbyPlayer[]>(state => state.lobby.players);
    const totalSecondsRemaining = useSelector<AppState, number>(state => state.lobby.secondsRemaining);

    if (lobbyId === null) {
        return <div>An error occured, please refresh your page</div>;
    }

    return (
        <div className="lobby">
            <div className="lobby-info">
                <div className="players">
                    {
                        players.map(p => (
                            <div className={`player${p.isBot ? " bot" : ""}`}>
                                <span>{p.name}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="text">
                    <TimeRemaining totalSecondsRemaining={totalSecondsRemaining} />

                    <h2 className="lobby-id">Lobby ID: {lobbyId}</h2>

                    <p>The game will start {LOBBY_WAIT_TIME} seconds after the lobby is created,</p>
                    <p>or immediately when there are {MAX_PLAYERS_IN_GAME} players</p>
                </div>
            </div>

            <div className="github-link"><a href="https://reddit.com/r/creaturechess/">/r/CreatureChess</a> - <a href="https://github.com/Jameskmonger/creature-chess">Source and Licenses on GitHub</a></div>
        </div>
    )
};

export { LobbyStage };