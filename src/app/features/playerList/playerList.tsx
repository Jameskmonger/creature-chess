import * as React from "react";
import { PlayerListPlayer, GamePhase } from "@common/models";
import { PlayerListItem } from "./playerListItem";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";
import { opponentIdSelector, localPlayerIdSelector } from "../../store/gameSelector";

const PlayerList: React.FunctionComponent = () => {
    const players = useSelector<AppState, PlayerListPlayer[]>(state => state.playerList);
    const opponentId = useSelector<AppState, string>(opponentIdSelector);
    const localPlayerId = useSelector<AppState, string>(localPlayerIdSelector);
    const showReadyIndicators = useSelector<AppState, boolean>(state => state.game.phase === GamePhase.PREPARING);

    return (
        <div className="player-list">
            {
                players.map(p =>
                    <PlayerListItem
                        key={p.id}
                        playerId={p.id}
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

export { PlayerList };
