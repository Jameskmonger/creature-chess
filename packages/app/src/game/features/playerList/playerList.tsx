import * as React from "react";
import { PlayerListPlayer, GamePhase, PlayerStatus } from "@creature-chess/models";
import { PlayerListItem, QuitPlayerListItem } from "./playerListItem";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { getPlayerMoney, getPlayerLevel, getOpponentId } from "@creature-chess/shared";
import { getUserId } from "../../../auth/store/selectors";

const PlayerList: React.FunctionComponent = () => {
    const players = useSelector<AppState, PlayerListPlayer[]>(state => state.playerList);
    const opponentId = useSelector<AppState, string>(getOpponentId);
    const localPlayerId = useSelector<AppState, string>(getUserId);
    const showReadyIndicators = useSelector<AppState, boolean>(state => state.game.phase === GamePhase.PREPARING);

    const localPlayerMoney = useSelector<AppState, number>(getPlayerMoney);
    const localPlayerLevel = useSelector<AppState, number>(getPlayerLevel);

    return (
        <div className="player-list">
            {
                players.map(p => (
                    p.status === PlayerStatus.QUIT
                        ? (
                            <QuitPlayerListItem
                                key={p.id}
                                playerId={p.id}
                            />
                        )
                        : (
                            <PlayerListItem
                                key={p.id}
                                playerId={p.id}
                                player={p}
                                isLocal={p.id === localPlayerId}
                                isOpponent={p.id === opponentId}
                                ready={showReadyIndicators ? p.ready : null}
                                streakType={p.streakType}
                                streakAmount={p.streakAmount}
                                money={p.id === localPlayerId ? localPlayerMoney : p.money}
                                level={p.id === localPlayerId ? localPlayerLevel : p.level}
                            />
                        )
                ))
            }
        </div>
    );
};

export { PlayerList };
