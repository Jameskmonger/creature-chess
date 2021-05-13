import * as React from "react";
import { useSelector } from "react-redux";
import { PlayerListPlayer, GamePhase, PlayerStatus } from "@creature-chess/models";
import { getPlayerMoney, getPlayerLevel } from "@creature-chess/gamemode";
import { AppState } from "../../../../store";
import { PlayerListItem } from "./items/playerListItem";
import { StatusPlayerListItem } from "./items/statusPlayerListItem";
import { usePlayerId } from "../../../../auth";

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
    const localPlayerId = usePlayerId();
    const players = useSelector<AppState, PlayerListPlayer[]>(state => state.game.playerList);
    const opponentId = useSelector<AppState, string>(state => state.game.playerInfo.opponentId);
    const showReadyIndicators = useSelector<AppState, boolean>(state => state.game.roundInfo.phase === GamePhase.PREPARING);

    const localPlayerMoney = useSelector<AppState, number>(state => getPlayerMoney(state.game));
    const localPlayerLevel = useSelector<AppState, number>(state => getPlayerLevel(state.game));

    return (
        <div className="player-list">
            {
                players.map((p, index) => {
                    if (p.status === PlayerStatus.QUIT) {
                        return <StatusPlayerListItem key={p.id} playerId={p.id} status="Quit" />;
                    }

                    if (p.status === PlayerStatus.DEAD) {
                        return <StatusPlayerListItem key={p.id} playerId={p.id} status="Dead" subtitle={`${ordinal_suffix_of(index + 1)} place`} />;
                    }

                    return (
                        <PlayerListItem
                            key={p.id}
                            playerId={p.id}
                            index={index}
                            isLocal={p.id === localPlayerId}
                            isOpponent={p.id === opponentId}
                            showReadyIndicator={showReadyIndicators}
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
