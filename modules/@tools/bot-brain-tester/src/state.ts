import { useSelector } from "react-redux";

import { BoardState, createBoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

export type BotBrainTesterState = {
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;
};

export const useAppSelector = <TValue>(
	selector: (state: BotBrainTesterState) => TValue
) => useSelector<BotBrainTesterState, TValue>(selector);

export const board = createBoardSlice<PieceModel>("bot-brain-tester", {
	width: GamemodeSettingsPresets["default"].boardWidth,
	height: GamemodeSettingsPresets["default"].boardHalfHeight,
});

export const bench = createBoardSlice<PieceModel>("bot-brain-tester-bench", {
	width: GamemodeSettingsPresets["default"].benchSize,
	height: 1,
});
