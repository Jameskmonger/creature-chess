import * as React from "react";
import { PlayerListPlayer, StreakType } from "@common/models";
import { ProgressBar } from "../components/progressBar";

interface Props {
    player: PlayerListPlayer;
    isOpponent: boolean;
    isLocal: boolean;
    ready: boolean | null;
    streakType: StreakType | null;
    streakAmount: number | null;
}

const ReadyIndicator: React.FunctionComponent<{ ready: boolean | null }> = ({ ready }) => {
    if (ready === null) {
        return null;
    }

    return (
        <div className={`ready-indicator ${ready ? "ready" : "not-ready"}`} />
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
                <span className="name">{props.player.name}</span>

                <div className="badges">
                    <StreakIndicator type={props.streakType} amount={props.streakAmount} />
                    <ReadyIndicator ready={props.ready} />
                </div>
            </div>

            <ProgressBar
                className="healthbar friendly"
                current={props.player.health}
                max={100}
            />
        </div>
    );
};

export { PlayerListItem };
