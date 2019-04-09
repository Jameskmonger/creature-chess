import * as React from "react";
import { PlayerListPlayer } from "@common";
import { PlayerListItem } from "./playerListItem";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../../store/store";

interface Props {
    players: PlayerListPlayer[];
}

const PlayerListUnconnected: React.FunctionComponent<{ players: PlayerListPlayer[] }> = props => {
    const players = props.players.sort((a, b) => b.health - a.health);

    return (
        <div className="player-list">
            {players.map(p => <PlayerListItem key={p.id} player={p} />)}
        </div>
    );
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    players: state.playerList
});

const PlayerList = connect(mapStateToProps)(PlayerListUnconnected);

export { PlayerList };
