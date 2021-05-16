import * as React from "react";
import { ProgressBar } from "../../../display/progressBar";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Constants, getXpToNextLevel } from "@creature-chess/models";
import { PieceCount } from "./pieceCount";
import { getPlayerLevel, getPlayerXp, getPlayerMoney, PlayerActions } from "@creature-chess/gamemode";
import { MAX_PLAYER_LEVEL } from "@creature-chess/models";
import { usePlayerId } from "../../../auth";

const renderProgressBar = (current: number, max: number) => `${current} / ${max} xp`;

const Profile: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const playerId = usePlayerId();

	const level = useSelector<AppState, number>(state => getPlayerLevel(state.game));
	const xp = useSelector<AppState, number>(state => getPlayerXp(state.game));
	const money = useSelector<AppState, number>(state => getPlayerMoney(state.game));
	// todo reselect
	const health = useSelector<AppState, number | null>(state => {
		const player = state.game.playerList.find(p => p.id === playerId);

		return player ? player.health : null;
	});

	if (health === null) {
		return null;
	}

	const onBuyXp = () => dispatch(PlayerActions.buyXpPlayerAction());

	return (
		<div className="profile">
			<div className="row">
				<p className="item level">Level {level} <span className="highlight">${money}</span></p>
				{
					level !== MAX_PLAYER_LEVEL
					&& (
						<ProgressBar
							className="xp-progress"
							current={xp}
							max={getXpToNextLevel(level)}
							renderContents={renderProgressBar}
						/>
					)
				}
			</div>

			<div className="row">
				<PieceCount />
				{
					level !== MAX_PLAYER_LEVEL
					&& (
						<button
							className="buy-xp"
							onClick={onBuyXp}
						>
							Buy {Constants.BUY_XP_AMOUNT} xp (${Constants.BUY_XP_COST})
						</button>
					)
				}
			</div>

			<ProgressBar
				className="healthbar player-health"
				current={health}
				max={100}
				renderContents={renderProgressBar}
			/>
		</div>
	);
};

export {
	Profile
};
