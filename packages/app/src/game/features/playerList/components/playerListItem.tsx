import * as React from "react";
import { useSelector } from "react-redux";
import { GamePhase, PlayerListPlayer, StreakType } from "@creature-chess/models";
import { AppState } from "../../../../store";
import { ProgressBar } from "../../../../ui/display";
import { PlayerName } from "./playerName";
import { PlayerTitle } from "./playerTitle";
import { BattleInfo } from "./battleInfo";
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

const StatusPlayerListItem: React.FunctionComponent<{ playerId: string, status: string, subtitle?: string }> = ({ playerId, status, subtitle }) => {
    return (
        <div className="player-list-item quit">
            <div className="half">
                <span className="name"><PlayerName playerId={playerId} /></span>
            </div>
            <div className="half">
                <span className="status">{status}</span>
                <BattleInfo playerId={playerId} />
                {subtitle && <span className="subtitle">{subtitle}</span>}
            </div>
        </div>
    );
};

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
                            {props.index + 1}.&nbsp;<PlayerName playerId={props.playerId} />
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

export { PlayerListItem, StatusPlayerListItem };
