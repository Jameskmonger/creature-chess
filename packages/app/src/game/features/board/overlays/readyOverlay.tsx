import { getUserId } from "packages/app/src/auth";
import { PlayerListPlayer, StreakType } from "packages/models/lib";
import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { BoardOverlay } from "./boardOverlay";

const getStreakType = (player: PlayerListPlayer): string => {

    const streakType = player?.streakAmount === 0 ? ""
        : player?.streakType === StreakType.WIN ? player?.streakAmount === 1 ? "Win" : "Wins"
            : player?.streakAmount === 1 ? "Loss" : "Losses"

    return streakType
}

const getPosition = (player: PlayerListPlayer): number => {
    const position = useSelector((state: AppState) => {
        return state.game.playerList.indexOf(player) + 1
    })
    return position
}

const getPositionModifier = (position: number): string => { return position === 1 ? "st" : position === 2 ? "nd" : position === 3 ? "rd" : "th" }

const ReadyOverlay: React.FunctionComponent = () => {

    const player: PlayerListPlayer = useSelector((state: AppState) => {
        return state.game.playerList.find(p => p.id === getUserId(state))
    })

    const opponent: PlayerListPlayer = useSelector((state: AppState) => {
        const id = state.game.playerInfo.opponentId
        return state.game.playerList.find(p => p.id === id)
    })

    const playerPosition = getPosition(player)
    const opponentPosition = getPosition(opponent)

    if (!opponent) {
        return null
    }
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
