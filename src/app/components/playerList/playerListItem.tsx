import * as React from "react";
import { PlayerListPlayer } from "@common/models";
import { ProgressBar } from "../progressBar";

interface Props {
    player: PlayerListPlayer;
    isOpponent: boolean;
    isLocal: boolean;
    ready: boolean | null;
}

const ReadyIndicator: React.FunctionComponent<{ ready: boolean | null }> = ({ ready }) => {
    if (ready === null) {
        return null;
    }

    return (
        <div className={`ready-indicator ${ready ? "ready" : "not-ready"}`} />
    );
};

const PlayerListItem: React.FunctionComponent<Props> = props => {
    const className = `player-list-item ${props.isLocal ? " local" : ""} ${props.isOpponent ? " opponent" : ""}`;

    return (
        <div className={className}>
            <div className="row">
                <span className="name">{props.player.name}</span>

                <ReadyIndicator ready={props.ready} />
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
