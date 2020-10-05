import * as React from "react";
import { PlayerListPlayer, PlayerStatus, StreakType } from "@creature-chess/models";
import { ProgressBar } from "../../../display";
import { PlayerName } from "./playerName";
import { BattleInfo } from "./battleInfo";

interface Props {
    playerId: string;
    player: PlayerListPlayer;
    isOpponent: boolean;
    isLocal: boolean;
    ready: boolean | null;
    streakType: StreakType | null;
    streakAmount: number | null;
    money: number;
    level: number;
}

const ReadyIndicator: React.FunctionComponent<{ ready: boolean | null }> = ({ ready }) => {
    if (ready === null) {
        return null;
    }

    return (
        <span className={`ready-indicator ${ready ? "ready" : "not-ready"}`} />
    );
};

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
    const className = `player-list-item ${props.isLocal ? " local" : ""} ${props.isOpponent ? " opponent" : ""}`;

    return (
        <div className={className}>
            <div className="row">
                <div className="row-half">
                    <span className="name">
                        <ReadyIndicator ready={props.ready} />

                        <PlayerName playerId={props.playerId} /> {props.player.status === PlayerStatus.QUIT && 'has quit'}
                    </span>
                </div>

                <div className="row-half">
                    <ProgressBar
                        className="healthbar player-health"
                        current={props.player.health}
                        max={100}
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
    );
};

export { PlayerListItem, QuitPlayerListItem };
