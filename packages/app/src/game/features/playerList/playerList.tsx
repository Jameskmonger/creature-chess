import * as React from "react";
import { PlayerListPlayer, GamePhase, PlayerStatus } from "@creature-chess/models";
import { PlayerListItem, QuitPlayerListItem } from "./playerListItem";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { localPlayerIdSelector } from "../../store/selectors";
import { getPlayerMoney, getPlayerLevel, getOpponentId } from "@creature-chess/shared/player/playerSelectors";

const PlayerList: React.FunctionComponent = () => {
    const players = useSelector<AppState, PlayerListPlayer[]>(state => state.playerList);
    const opponentId = useSelector<AppState, string>(getOpponentId);
    const localPlayerId = useSelector<AppState, string>(localPlayerIdSelector);
    const showReadyIndicators = useSelector<AppState, boolean>(state => state.gameInfo.phase === GamePhase.PREPARING);

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
