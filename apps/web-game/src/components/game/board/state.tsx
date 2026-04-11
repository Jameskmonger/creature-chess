
import { SubscribableBoard } from "@creature-chess/board";
import { GamemodeSettingsPresets } from "@creature-chess/models";
import React, { createContext, useRef } from "react";
import { PieceRegistry } from "@creature-chess/utils";

import { PieceAnimationEventStore } from "./piece/match/animationEventStore";

export class GameBoardState {
	public readonly board: SubscribableBoard;
	public readonly bench: SubscribableBoard;
	public readonly matchBoard: SubscribableBoard;
	public readonly pieceRegistry: PieceRegistry;
	public readonly animationEventStore: PieceAnimationEventStore;

	public constructor() {
		this.board = new SubscribableBoard(
			GamemodeSettingsPresets["default"].boardWidth,
			GamemodeSettingsPresets["default"].boardHalfHeight
		);
		this.bench = new SubscribableBoard(
			GamemodeSettingsPresets["default"].benchSize,
			1
		);
		this.matchBoard = new SubscribableBoard(
			GamemodeSettingsPresets["default"].boardWidth,
			GamemodeSettingsPresets["default"].boardHalfHeight * 2,
		);
		this.pieceRegistry = new PieceRegistry();
		this.animationEventStore = new PieceAnimationEventStore();
	}
}

const GameBoardContext = createContext<GameBoardState | null>(null);

export function GameBoardProvider({ children }: React.PropsWithChildren) {
	const ref = useRef<GameBoardState | null>(null);

	if (ref.current === null) {
		ref.current = new GameBoardState();
	}

	return (
		<GameBoardContext.Provider value={ref.current}>
			{children}
		</GameBoardContext.Provider>
	);
}

export function useGameBoards() {
	const context = React.useContext(GameBoardContext);

	if (!context) {
		throw new Error(
			"useGameBoards must be used within a GameBoardProvider"
		);
	}

	return context;
}
