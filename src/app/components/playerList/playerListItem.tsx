import * as React from "react";
import { PlayerListPlayer } from "@common";
import { ProgressBar } from "../progressBar";

interface Props {
    player: PlayerListPlayer;
    isOpponent: boolean;
}

const PlayerListItem: React.FunctionComponent<Props> = props => {
    const className = `player-list-item ${props.isOpponent ? " opponent" : ""}`;

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
