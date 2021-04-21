import { getUserId } from "packages/app/src/auth";
import { GamePhase, PlayerListPlayer, StreakType } from "packages/models/lib";
import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { BoardOverlay } from "./boardOverlay";

const getStreakType = (player: PlayerListPlayer): string => {
    const { streakType, streakAmount } = player

    if (!player || streakAmount === 0) {
        return ""
    }
    if (streakType === StreakType.WIN) {
        return streakAmount === 1 ? "Win" : "Wins"
    }
    return streakAmount === 1 ? "Loss" : "Losses"
}

const getPosition = (player: PlayerListPlayer, playerList: PlayerListPlayer[]): number => {
    return playerList.indexOf(player) + 1
}

const getPositionModifier = (position: number): string => {
    return position === 1 ? "st" : position === 2 ? "nd" : position === 3 ? "rd" : "th"
}

const ReadyOverlay: React.FunctionComponent = () => {

    const inReadyPhase = useSelector<AppState, Boolean>(state =>
        state.game.roundInfo.phase === GamePhase.READY
    )

    const playerList = useSelector((state: AppState) => {
        return state.game.playerList
    })

    const player: PlayerListPlayer = useSelector((state: AppState) => {
        return playerList.find(p => p.id === getUserId(state))
    })

    const opponent: PlayerListPlayer = useSelector((state: AppState) => {
        const id = state.game.playerInfo.opponentId
        return state.game.playerList.find(p => p.id === id)
    })

    if (!opponent || !inReadyPhase) {
        return null
    }

    const playerPosition = getPosition(player, playerList)
    const opponentPosition = getPosition(opponent, playerList)


    return (
        <BoardOverlay>
            <div className="ready-overlay-content">
                <h3>Now Playing {opponent.name}</h3>
                <ul className="h2h">
                    <li>Health: <span className="highlight">{player.health} </span>
                     vs. <span className="opponent">{opponent.health}</span></li>
                    <li>Level: <span className="highlight">{player.level} </span>
                     vs. <span className="opponent">{opponent.level}</span></li>
                    <li>Streak: <span className="highlight">{player.streakAmount} {getStreakType(player)} </span>
                     vs. <span className="opponent">{opponent.streakAmount} {getStreakType(opponent)}</span></li>
                    <li>Position: <span className="highlight">{playerPosition}{getPositionModifier(playerPosition)} </span>
                     vs. <span className="opponent">{opponentPosition}{getPositionModifier(opponentPosition)}</span></li>
                </ul>
            </div>
        </BoardOverlay>
    )
}

export { ReadyOverlay }
