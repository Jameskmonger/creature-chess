import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { LOBBY_WAIT_TIME, MAX_PLAYERS_IN_GAME } from "@creature-chess/models/src/constants";
import { LobbyPlayer } from "@creature-chess/models";
import { Countdown } from "../../display/countdown";
import { Footer } from "../../display/footer";

const padNumberToTwo = (val: number) => val < 10 ? `0${val}` : val.toString();

const countdownRender = (totalSecondsRemaining: number) => {
    const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
    const secondsRemaining = Math.ceil(totalSecondsRemaining % 60);

    const time = `${minutesRemaining}:${padNumberToTwo(secondsRemaining)}`;

    return (
        <div className="timeRemaining">
            Game starting in <span className="time">{time}</span>
        </div>
    );
};

const LobbyPage: React.FunctionComponent = () => {
    const lobbyId = useSelector<AppState, string>(state => state.lobby.lobbyId);

    if (lobbyId === null) {
        return <div>An error occured, please refresh your page</div>;
    }

    const players = useSelector<AppState, LobbyPlayer[]>(state => state.lobby.players);
    const lobbyStartingAtMs = useSelector<AppState, number>(state => state.lobby.startingAtMs);

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
                    {
                        lobbyStartingAtMs
                        && (
                            <Countdown
                                countdownToSeconds={lobbyStartingAtMs / 1000}
                                render={countdownRender}
                            />
                        )
                    }

                    <h2 className="lobby-id">Lobby ID: {lobbyId}</h2>

                    <p>
                        The game will start {LOBBY_WAIT_TIME} seconds after the lobby is created,
                                or immediately when there are {MAX_PLAYERS_IN_GAME} players
                            </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export { LobbyPage };
