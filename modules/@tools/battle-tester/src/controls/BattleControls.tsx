import React from "react";

import { useDispatch } from "react-redux";

import { BattleCommands } from "@creature-chess/battle";

import { initialBoardPieces } from "../piece";
import { board } from "../state";
import { SelectedTileInfo } from "./SelectedTile";

export function BattleControls() {
	const dispatch = useDispatch();

	const onClickStart = React.useCallback(
		() => dispatch(BattleCommands.startBattleCommand({})),
		[dispatch]
	);

	const onClickPause = React.useCallback(
		() => dispatch(BattleCommands.pauseBattleCommand()),
		[dispatch]
	);

	const onClickResume = React.useCallback(
		() => dispatch(BattleCommands.resumeBattleCommand()),
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
			<button onClick={onClickPause}>Pause Battle</button>
			<button onClick={onClickResume}>Resume Battle</button>
			<button onClick={onClickReset}>Reset</button>

			<hr />

			<SelectedTileInfo />
		</div>
	);
}
