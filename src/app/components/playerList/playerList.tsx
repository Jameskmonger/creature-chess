import * as React from "react";
import { PlayerListPlayer } from "@common/models";
import { PlayerListItem } from "./playerListItem";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../../store/store";
import { opponentIdSelector, localPlayerIdSelector } from "../../selectors/gameSelector";

interface Props {
    players: PlayerListPlayer[];
    opponentId: string;
    localPlayerId: string;
}

const PlayerListUnconnected: React.FunctionComponent<Props> = ({ players, localPlayerId, opponentId }) => {
    return (
        <div className="player-list">
            {
                players.map(p =>
                    <PlayerListItem
                        key={p.id}
                        player={p}
                        isLocal={p.id === localPlayerId}
                        isOpponent={p.id === opponentId}
                    />
                )
            }
        </div>
    );
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    players: state.playerList,
    opponentId: opponentIdSelector(state),
    localPlayerId: localPlayerIdSelector(state)
});

const PlayerList = connect(mapStateToProps)(PlayerListUnconnected);

export { PlayerList };
