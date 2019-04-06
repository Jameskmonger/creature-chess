import * as React from "react";
import { Player } from "@common";
import { ProgressBar } from "../progressBar";

const PlayerListItem: React.FunctionComponent<{ player: Player }> = props => {
    return (
        <div className="player-list-item">
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
