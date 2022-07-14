import { PlayerBattleStatus, PlayerListPlayer } from "modules/@creature-chess/models";
import * as React from "react";
import { useState} from "react"
import { useSelector } from "react-redux";

import { AppState } from "../../../store";
import { BoardOverlay } from "./boardOverlay";


const matchesInProgress : React.FunctionComponent = () => {

	const showMatchesOverlay = useSelector<AppState, boolean>(
		(state) => state.game.ui.winnerId !== null
	);
	const inProgress = useSelector<AppState, any>(
		(state) => {
			const ongoing = state.game.playerList.filter((play:PlayerListPlayer) =>{
				play.battle?.status == PlayerBattleStatus.IN_PROGRESS
			})
			return ongoing

	})

	const [playersInMatch, setOngoingMatches] = useState(inProgress())

	return(
		<ul>
			{
				playersInMatch.map((player:PlayerListPlayer)=>{
					<li>{player}</li>
				})
			}
		</ul>
		)

}
