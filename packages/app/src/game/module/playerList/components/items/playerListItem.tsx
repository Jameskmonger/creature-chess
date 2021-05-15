import * as React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GamePhase, PlayerListPlayer, StreakType } from "@creature-chess/models";
import { PlayerGameActions } from "@creature-chess/gamemode";
import { AppState } from "../../../../../store";
import { ProgressBar } from "../../../../../display";
import { PlayerName } from "../playerName";
import { PlayerTitle } from "../playerTitle";
import { BattleInfo } from "../battleInfo";
import { PlayerPicture } from "../playerPicture";
import { useOnClickOutside } from "../../../../../hooks/useOnClickOutside";

interface Props {
	index: number;
	playerId: string;
	isOpponent: boolean;
	isLocal: boolean;

	showReadyIndicator?: boolean;
	level?: number;
	money?: number;
}

const StreakIndicator: React.FunctionComponent<{ type: StreakType | null, amount: number | null }> = ({ type, amount }) => {
	if (type === null || !amount || amount === 1) {
		return null;
	}

	return <div className={`streak-indicator ${type === StreakType.WIN ? "win" : "lose"}`}>{amount}</div>;
};

const renderHealthbar = (current: number) => current.toString();

const SpectateButton: React.FunctionComponent<{ playerId: string }> = ({ playerId }) => {
	const dispatch = useDispatch();

	const onClick = (e: React.MouseEvent) => {
		dispatch(PlayerGameActions.spectatePlayerAction({ playerId }));

		e.persist();
		e.nativeEvent.stopImmediatePropagation();
		e.stopPropagation();
	};

	return <button className="spectate-player" onClick={onClick}>Spectate</button>;
};

const PlayerListItem: React.FunctionComponent<Props> = ({ index, playerId, isOpponent, isLocal, showReadyIndicator = false, level = null, money = null }) => {
	const player = useSelector<AppState, PlayerListPlayer>(state => state.game.playerList.find(p => p.id === playerId));
	const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.roundInfo.phase === GamePhase.PREPARING);
	const readyClassName = (player.ready && showReadyIndicator) ? "ready" : "not-ready";

	const ref = useRef();
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	useOnClickOutside(ref, () => setIsExpanded(false));

	const className = `player-list-item ${isLocal ? "local" : ""} ${isOpponent ? "opponent" : ""} ${inPreparingPhase ? readyClassName : "not-ready"}`;

	const toggleExpanded = () => {
		// setIsExpanded(!isExpanded);
	};

	return (
		<div
			className={className}
			onClick={toggleExpanded}
			ref={ref}
		>
			<div className="picture">
				<PlayerPicture playerId={playerId} />
			</div>
			<div className="details">
				<div className="row">
					<div className="row-half name-container">
						<span className="name">
							{index + 1}.&nbsp;<PlayerName playerId={playerId} />
						</span>
						<PlayerTitle playerId={playerId} />
					</div>
					<div className="row-half">
						{
							!isExpanded &&
							<ProgressBar
								className="healthbar player-health"
								current={player.health}
								max={100}
								renderContents={renderHealthbar}
							/>
						}
					</div>
				</div>
				<div className="row">
					<div className="row-half">
						<div className="badges">
							<span className="badge money">${money ? money : player.money}</span>
							<span className="badge">Lv {level ? level : player.level}</span>
						</div>
					</div>

					<div className={`row-half ${isExpanded ? "center" : ""}`}>
						{
							isExpanded
								? <SpectateButton playerId={playerId} />
								: <>
									<BattleInfo playerId={playerId} />
									<StreakIndicator type={player.streakType} amount={player.streakAmount} />
								</>
						}

					</div>
				</div>
			</div>
		</div>
	);
};

export { PlayerListItem };
