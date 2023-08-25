import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

import { BoardSelectors, BoardState } from "@shoki/board";

import { useLocalPlayerId } from "@creature-chess/auth-web/context";
import {
	getPlayerLevel,
	getPlayerXp,
	getPlayerMoney,
	PlayerActions,
} from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";
import { PlayerGameProfile } from "@creature-chess/ui";

import { AppState } from "../../../store";

export const Profile: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const playerId = useLocalPlayerId();

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

		return player ? player.health : null;
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
			health={health}
			level={level}
			xp={xp}
			money={money}
			pieceCount={pieceCount}
			onBuyXpClick={onBuyXp}
		/>
	);
};
