import * as React from "react";
import { PlayerListPlayer, GamePhase, PlayerStatus } from "@creature-chess/models";
import { PlayerListItem, StatusPlayerListItem } from "./playerListItem";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { getPlayerMoney, getPlayerLevel, getOpponentId } from "@creature-chess/shared";
import { getUserId } from "../../../menu/auth/store/selectors";

// todo move this
function ordinal_suffix_of(i: number) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

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
                players.map((p, index) => {
                    if (p.status === PlayerStatus.QUIT) {
                        return <StatusPlayerListItem key={p.id} playerId={p.id} status="Quit" />;
                    }

                    if (p.roundDiedAt) {
                        return <StatusPlayerListItem key={p.id} playerId={p.id} status="Dead" subtitle={`${ordinal_suffix_of(index + 1)} place`} />;
                    }

                    return (
                        <PlayerListItem
                            key={p.id}
                            playerId={p.id}
                            player={p}
                            index={index}
                            isLocal={p.id === localPlayerId}
                            isOpponent={p.id === opponentId}
                            ready={showReadyIndicators ? p.ready : null}
                            streakType={p.streakType}
                            streakAmount={p.streakAmount}
                            money={p.id === localPlayerId ? localPlayerMoney : p.money}
                            level={p.id === localPlayerId ? localPlayerLevel : p.level}
                        />
                    )
                })
            }
        </div>
    );
};

export { PlayerList };
