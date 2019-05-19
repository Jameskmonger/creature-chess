import * as React from "react";
import { PlayerListPlayer } from "@common/models";
import { ProgressBar } from "../progressBar";

interface Props {
    player: PlayerListPlayer;
    isOpponent: boolean;
    isLocal: boolean;
}

const PlayerListItem: React.FunctionComponent<Props> = props => {
    const className = `player-list-item ${props.isLocal ? " local" : ""} ${props.isOpponent ? " opponent" : ""}`;

    return (
        <div className={className}>
            <span className="name">{props.player.name}</span>

            <ProgressBar
                className="healthbar friendly"
                current={props.player.health}
                max={100}
            />
        </div>
    );
};

export { PlayerListItem };
