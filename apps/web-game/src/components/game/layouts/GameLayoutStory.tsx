import React, { useMemo, useRef } from "react";

import { AccountContextProvider } from "~/auth/context";
import { GameSession } from "~/game/GameSession";
import { GameSessionHolder } from "~/game/GameSessionHolder";
import { GameSessionProvider, useGameSession } from "~/game/sessionContext";
import { ConnectionStatus } from "~/networking";
import { GameState } from "~/store/game/state";
import { Overlay } from "~/store/game/ui/overlay";

import { Builders, GamePhase } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models";

import { GameStateProvider } from "../../../../.storybook/GameStateProvider";
import { useGlobalStyles } from "../../../styles";

const MOCK_PIECES = {
	board: [
		Builders.buildPieceModel({
			id: "board-1",
			ownerId: "1234",
			definitionId: 1,
			traits: ["wood", "valiant"],
			stage: 1,
			maxHealth: 60,
		}),
		Builders.buildPieceModel({
			id: "board-2",
			ownerId: "1234",
			definitionId: 2,
			traits: ["wood", "cunning"],
			stage: 0,
			maxHealth: 30,
		}),
		Builders.buildPieceModel({
			id: "board-3",
			ownerId: "1234",
			definitionId: 3,
			traits: ["earth", "valiant"],
			stage: 2,
			maxHealth: 120,
		}),
	],
	bench: [
		Builders.buildPieceModel({
			id: "bench-1",
			ownerId: "1234",
			definitionId: 4,
			traits: ["earth", "cunning"],
			stage: 0,
			maxHealth: 30,
		}),
		Builders.buildPieceModel({
			id: "bench-2",
			ownerId: "1234",
			definitionId: 5,
			traits: ["metal", "valiant"],
			stage: 1,
			maxHealth: 60,
		}),
	],
};

function MockPieceSetup({ children }: React.PropsWithChildren) {
	const { board, bench, pieceRegistry } = useGameSession();
	const initialized = useRef(false);

	if (!initialized.current) {
		initialized.current = true;

		board.setPieces([
			{ id: "board-1", x: 1, y: 0 },
			{ id: "board-2", x: 3, y: 1 },
			{ id: "board-3", x: 5, y: 2 },
		]);

		bench.setPieces([
			{ id: "bench-1", x: 0, y: 0 },
			{ id: "bench-2", x: 2, y: 0 },
		]);

		for (const piece of [...MOCK_PIECES.board, ...MOCK_PIECES.bench]) {
			pieceRegistry.registerPiece(piece);
		}
	}

	return <>{children}</>;
}

export type GameLayoutStoryArgs = {
	phase: GamePhase;
	overlay?: Overlay | null;
	winnerId?: string;
	connectionStatus?: ConnectionStatus;
	opponentId?: string;
	opponentIsClone?: boolean;
	matchRewards?: GameState["localPlayer"]["matchRewards"];
	cardShop?: Partial<GameState["cardShop"]>;
	selectedPiece?: boolean;
	selectedPieceStage?: number;
};

export function GameLayoutStoryWrapper({
	args,
	children,
}: {
	args: GameLayoutStoryArgs;
	children: React.ReactNode;
}) {
	useGlobalStyles();

	const holder = useMemo(() => {
		const h = new GameSessionHolder();
		h.set(new GameSession(GamemodeSettingsPresets.default));
		return h;
	}, []);

	const decorateState = (state: GameState): GameState => ({
		...state,
		ui: {
			...state.ui,
			winnerId: args.winnerId ? args.winnerId : state.ui.winnerId,
			currentOverlay: args.overlay ?? state.ui.currentOverlay,
			connectionStatus: args.connectionStatus
				? args.connectionStatus
				: state.ui.connectionStatus,
			// todo
			selectedPieceId: null,
		},
		roundInfo: {
			...state.roundInfo,
			phase: args.phase,
		},
		localPlayer: {
			...state.localPlayer,
			matchRewards: args.matchRewards
				? args.matchRewards
				: state.localPlayer.matchRewards,
			opponentId: args.opponentId
				? args.opponentId
				: state.localPlayer.opponentId,
			opponentIsClone: args.opponentIsClone
				? args.opponentIsClone
				: state.localPlayer.opponentIsClone,
		},
		cardShop: {
			...state.cardShop,
			...args.cardShop,
		},
	});

	return (
		<GameSessionProvider holder={holder}>
			<MockPieceSetup>
				<GameStateProvider decorateState={decorateState}>
					<AccountContextProvider
						value={{
							type: "guest",
							id: "1234",
							nickname: "jkm",
						}}
					>
						{children}
					</AccountContextProvider>
				</GameStateProvider>
			</MockPieceSetup>
		</GameSessionProvider>
	);
}
