import React from "react";

import { useDispatch } from "react-redux";

import { startBattle } from "@creature-chess/battle";

import { initialBoardPieces } from "../piece";
import { board } from "../state";
import { SelectedTileInfo } from "./SelectedTile";

export function BattleControls() {
	const dispatch = useDispatch();

	const onClickStart = React.useCallback(
		() => dispatch(startBattle()),
		[dispatch]
	);

	const onClickReset = React.useCallback(
		() => dispatch(board.commands.setBoardPiecesCommand(initialBoardPieces)),
		[dispatch]
	);

	return (
		<div>
			<h1>Controls</h1>
			<button onClick={onClickStart}>Start Battle</button>
			<button onClick={onClickReset}>Reset</button>

			<hr />

			<SelectedTileInfo />
		</div>
	);
}
