import * as React from "react";
import { GamePhase } from "@common";
import { PlayerListPlayer } from "@common/models";
import { PlayerListItem } from "./playerListItem";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../store/store";
import { opponentIdSelector, localPlayerIdSelector } from "../store/gameSelector";

interface Props {
    players: PlayerListPlayer[];
    opponentId: string;
    localPlayerId: string;
    showReadyIndicators: boolean;
}

const PlayerListUnconnected: React.FunctionComponent<Props> = ({ players, localPlayerId, opponentId, showReadyIndicators }) => {
    return (
        <div className="player-list">
            {
                players.map(p =>
                    <PlayerListItem
                        key={p.id}
                        player={p}
                        isLocal={p.id === localPlayerId}
                        isOpponent={p.id === opponentId}
                        ready={showReadyIndicators ? p.ready : null}
                        streakType={p.streakType}
                        streakAmount={p.streakAmount}
                    />
                )
            }
        </div>
    );
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    players: state.playerList,
    opponentId: opponentIdSelector(state),
    localPlayerId: localPlayerIdSelector(state),
    showReadyIndicators: state.game.phase === GamePhase.PREPARING
});

const PlayerList = connect(mapStateToProps)(PlayerListUnconnected);

export { PlayerList };
