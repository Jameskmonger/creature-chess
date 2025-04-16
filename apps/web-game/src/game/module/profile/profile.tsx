import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

import { BoardSelectors, BoardState } from "@shoki/board";

import {
	getPlayerLevel,
	getPlayerXp,
	getPlayerMoney,
	PlayerActions,
} from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";

import { useLocalPlayerId } from "@cc-web/auth/context";
import { PlayerGameProfile } from "@cc-web/ui";

import { AppState } from "../../../store";

export const Profile: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const playerId = useLocalPlayerId();

	const name = useSelector<AppState, string>(
		(state) => state.game.playerList.find((p) => p.id === playerId)?.name || ""
	);

	const position = useSelector<AppState, number>(
		(state) => state.game.playerList.findIndex((p) => p.id === playerId) + 1
	);

	const level = useSelector<AppState, number>((state) =>
		getPlayerLevel(state.game)
	);
	const xp = useSelector<AppState, number>((state) => getPlayerXp(state.game));
	const money = useSelector<AppState, number>((state) =>
		getPlayerMoney(state.game)
	);
	// todo reselect
	const health = useSelector<AppState, number | null>((state) => {
		const player = state.game.playerList.find((p) => p.id === playerId);

		return player?.health || null;
	});

	const board = useSelector<AppState, BoardState<PieceModel>>(
		(state) => state.game.board
	);
	const pieceCount = BoardSelectors.getAllPieces(board).filter(
		(p) => p.ownerId === playerId
	).length;

	const onBuyXp = () => dispatch(PlayerActions.buyXpPlayerAction());

	return (
		<PlayerGameProfile
			name={name}
			position={position}
			health={health}
			level={level}
			xp={xp}
			money={money}
			pieceCount={pieceCount}
			onBuyXpClick={onBuyXp}
		/>
	);
};
