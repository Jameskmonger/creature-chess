import { useSelector } from "react-redux";

import { AppState } from "../../../store";

export const useGameBoard = () =>
	useSelector((state: AppState) => state.game.board);
export const useGameBench = () =>
	useSelector((state: AppState) => state.game.bench);
export const useGameMatchBoard = () =>
	useSelector((state: AppState) => state.game.match.board);
