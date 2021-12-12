import * as React from "react";
import { useSelector } from "react-redux";
import { getPlayerLevel } from "@creature-chess/gamemode";
import { usePlayerId } from "@creature-chess/auth-web";
import { AppState } from "../../../store";
import { BoardSelectors, BoardState } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";

const PieceCount: React.FunctionComponent = props => {
	const playerId = usePlayerId();
	const level = useSelector<AppState, number>(state => getPlayerLevel(state.game));
	const board = useSelector<AppState, BoardState<PieceModel>>(state => state.game.board);
	const pieceCount = BoardSelectors.getAllPieces(board).filter(p => p.ownerId === playerId).length;

	if (pieceCount !== level) {
		return <p className="item pieces warning">{pieceCount} / {level} pieces (board not full!)</p>;
	}

	return <p className="item pieces">{pieceCount} / {level} pieces</p>;
};

export {
	PieceCount
};
