import * as React from "react";
import { GamePhase, PlayerListPlayer, StreakType } from "@creature-chess/models";
import { ProgressBar } from "../../../ui/display";
import { PlayerName } from "./playerName";
import { PlayerTitle } from "./playerTitle";
import { BattleInfo } from "./battleInfo";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { PlayerPicture } from "./playerPicture";

interface Props {
    playerId: string;
    player: PlayerListPlayer;
    index: number;
    isOpponent: boolean;
    isLocal: boolean;
    ready: boolean | null;
    streakType: StreakType | null;
    streakAmount: number | null;
    money: number;
    level: number;
}

const StreakIndicator: React.FunctionComponent<{ type: StreakType | null, amount: number | null }> = ({ type, amount }) => {
    if (type === null || !amount || amount === 1) {
        return null;
    }

    return <div className={`streak-indicator ${type === StreakType.WIN ? "win" : "lose"}`}>{amount}</div>;
};

const QuitPlayerListItem: React.FunctionComponent<{ playerId: string }> = ({ playerId }) => {
    return (
        <div className="player-list-item quit">
            <div className="row">
                <div className="row-half">
                    <span className="name">
                        <PlayerName playerId={playerId} />
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="row-half"></div>

                <div className="row-half">
                    <span className="status">Quit</span>
                </div>
            </div>
        </div>
    );
}

const PlayerListItem: React.FunctionComponent<Props> = props => {
    const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.phase === GamePhase.PREPARING);
    const readyClassName = props.ready ? "ready" : "not-ready";

    const className = `player-list-item ${props.isLocal ? "local" : ""} ${props.isOpponent ? "opponent" : ""} ${inPreparingPhase ? readyClassName : "not-ready"}`;

    return (
        <div className={className}>
            <div className="picture">
                <PlayerPicture playerId={props.playerId} />
            </div>
            <div className="details">
                <div className="row">
                    <div className="row-half name-container">
                        <span className="name">
                            {props.index}&nbsp;<PlayerName playerId={props.playerId} />
                        </span>

                        <PlayerTitle playerId={props.playerId} />
                    </div>

                    <div className="row-half">
                        <ProgressBar
                            className="healthbar player-health"
                            current={props.player.health}
                            max={100}
                            renderContents={current => current.toString()}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="row-half">
                        <div className="badges">
                            <span className="badge money">${props.money}</span>
                            <span className="badge">Lv {props.level}</span>
                        </div>
                    </div>

                    <div className="row-half">
                        <BattleInfo playerId={props.playerId} />
                        <StreakIndicator type={props.streakType} amount={props.streakAmount} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { PlayerListItem, QuitPlayerListItem };
