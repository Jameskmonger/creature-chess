import React from "react";

import { useSelector } from "react-redux";
import { useGameSession } from "~/game/sessionContext";
import { Region } from "~/plugins";
import { AppState } from "~/store";

import { GamePhase } from "@creature-chess/models";

import { GameBoard } from "./GameBoard";
import { getBoardSurfaceConfig } from "./boardSurfaceConfig";
import {
	useOnClickTile,
	useOnDropPiece,
	useRenderMatchPiece,
	useRenderReadOnlyPiece,
	useRenderSelectablePiece,
} from "./hooks";
import { ProjectileCanvas } from "./projectiles/ProjectileCanvas";

export function BoardSurface({ children }: { children?: React.ReactNode }) {
	const phase = useSelector<AppState, GamePhase | null>(
		(state) => state.game.roundInfo.phase
	);
	const spectatingId = useSelector<AppState, string | null>(
		(state) => state.game.spectating.id
	);
	const config = getBoardSurfaceConfig({ phase, spectatingId });

	const session = useGameSession();
	const surfaceBoard = config.isMatch ? session.battle.board : session.board;
	const { bench, pieceRegistry } = session;

	const renderSelectable = useRenderSelectablePiece();
	const renderReadOnly = useRenderReadOnlyPiece();
	const renderMatch = useRenderMatchPiece();

	const renderBoardPiece = config.isMatch
		? renderMatch
		: config.isInteractive
			? renderSelectable
			: renderReadOnly;
	const renderBenchPiece = config.isInteractive
		? renderSelectable
		: renderReadOnly;

	const onClickTile = useOnClickTile(surfaceBoard, bench, {
		canClickBoard: !config.isMatch,
	});
	const onDropPiece = useOnDropPiece(surfaceBoard, bench);

	return (
		<Region
			cls="board-surface"
			ctx={{ isMatch: config.isMatch, isPreparing: config.isPreparing }}
		>
			<GameBoard
				board={surfaceBoard}
				bench={bench}
				pieceRegistry={pieceRegistry}
				renderBoardPiece={renderBoardPiece}
				renderBenchPiece={renderBenchPiece}
				onClick={config.isInteractive ? onClickTile : undefined}
				onDropPiece={config.isInteractive ? onDropPiece : undefined}
				boardDraggable={config.boardDraggable}
				benchDraggable={config.benchDraggable}
				showFiller={config.isPreparing}
			>
				{config.isMatch && <ProjectileCanvas />}
				{children}
			</GameBoard>
		</Region>
	);
}
