import * as React from "react";
import { PlayerListPlayer, StreakType } from "@creature-chess/shared/models";
import { ProgressBar } from "../../display";
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

const PlayerListItem: React.FunctionComponent<Props> = props => {
    const className = `player-list-item ${props.isLocal ? " local" : ""} ${props.isOpponent ? " opponent" : ""}`;

    return (
        <div className={className}>
            <div className="row">
                <div className="row-half">
                    <span className="name">
                        <ReadyIndicator ready={props.ready} />

                        <PlayerName playerId={props.playerId} />
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

export { PlayerListItem };
