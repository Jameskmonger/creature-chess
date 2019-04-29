import * as React from "react";
import { PlayerListPlayer } from "@common";
import { PlayerListItem } from "./playerListItem";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../../store/store";
import { opponentIdSelector } from "../../selectors/gameSelector";

interface Props {
    players: PlayerListPlayer[];
    opponentId: string;
}

const PlayerListUnconnected: React.FunctionComponent<Props> = props => {
    const players = props.players.sort((a, b) => b.health - a.health);

    return (
        <div className="player-list">
            {players.map(p => <PlayerListItem key={p.id} player={p} isOpponent={p.id === props.opponentId} />)}
        </div>
    );
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    players: state.playerList,
    opponentId: opponentIdSelector(state)
});

const PlayerList = connect(mapStateToProps)(PlayerListUnconnected);

export { PlayerList };
