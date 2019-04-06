import * as React from "react";
import { Player } from "@common";
import { PlayerListItem } from "./playerListItem";

const PlayerList: React.FunctionComponent<{ players: Player[] }> = props => {
    const players = props.players.sort((a, b) => b.health - a.health);

    return (
        <div className="player-list">
            {players.map(p => <PlayerListItem key={p.id} player={p} />)}
        </div>
    );
};

export { PlayerList };
