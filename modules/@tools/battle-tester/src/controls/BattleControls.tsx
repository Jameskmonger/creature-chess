import React from "react";

import { useDispatch } from "react-redux";

import { BattleCommands } from "@creature-chess/battle";

import { initialBoardPieces } from "../piece";
import { board, useAppSelector } from "../state";
import { BoardLogger } from "./BoardLogger";
import { SelectedTileInfo } from "./SelectedTile";

export function BattleControls() {
	const dispatch = useDispatch();
	const [isPaused, setIsPaused] = React.useState(false);
	const currentTurn = useAppSelector((state) => state.currentTurn);

	const onClickStart = React.useCallback(() => {
		dispatch(BattleCommands.startBattleCommand({}));
		setIsPaused(false);
	}, [dispatch]);

	const onClickPause = React.useCallback(() => {
		dispatch(BattleCommands.pauseBattleCommand());

		setIsPaused(true);
	}, [dispatch]);

	const onClickResume = React.useCallback(() => {
		dispatch(BattleCommands.resumeBattleCommand());

		setIsPaused(false);
	}, [dispatch]);

	const onClickReset = React.useCallback(
		() => dispatch(board.commands.setBoardPiecesCommand(initialBoardPieces)),
		[dispatch]
	);

	return (
		<div>
			<h1>Controls</h1>
			<button onClick={onClickStart}>Start Battle</button>
			<button onClick={isPaused ? onClickResume : onClickPause}>
				{isPaused ? "Resume" : "Pause"} Battle
			</button>
			<button onClick={onClickReset}>Reset</button>

			<hr />

			<BoardLogger />

			<hr />

			<span>Turn {currentTurn}</span>

			<SelectedTileInfo />
		</div>
	);
}
